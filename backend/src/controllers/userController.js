// src/controllers/userController.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const fs = require('fs');
const path = require('path');


const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const defaultImagePath = path.join(__dirname, '..', 'routes', 'uploads', 'Imagen-fondo-por-defecto.jpg');
const defaultImageData = fs.readFileSync(defaultImagePath);
const defaultMimeType = 'image/jpeg';

const createUserImageController = async (req, res) => {
  try {
    const { userId } = req.body;
    const newUserImage = await userModel.createUserImage(userId, defaultImageData, defaultMimeType);

    if (newUserImage) {
      res.status(201).json({ message: "Imagen de usuario creada", image: newUserImage });
    } else {
      res.status(500).json({ error: "Error al crear la imagen de usuario" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await userModel.getUserById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
const createUser = async (req, res) => {
  try {
    const { email, password, full_name, date_of_birth } = req.body;
    const user = await userModel.getUserByEmail({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: "El usuario ya existe en la base de datos" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await userModel.createUser({
      ...req.body,
      password_hash: hashedPassword,
    });

    if (newUser && newUser.rows && newUser.rows.length > 0) {
      const tokens = userModel.generateToken(newUser.rows[0]);
      await userModel.saveRefreshToken(
        newUser.rows[0].user_id,
        tokens.refreshToken
      );

      // Llamar a createUserImageController para crear la imagen por defecto
      await createUserImageController({ body: { userId: newUser.rows[0].user_id } }, { status: () => ({json: () => {}}) });

      res.cookie("refreshToken", tokens.refreshToken, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
      });

      res.status(201).json({ 
        msg: "Usuario creado", 
        accessToken: tokens.accessToken,
        user: {
          email: newUser.rows[0].email,
          full_name: newUser.rows[0].full_name,
          user_id: newUser.rows[0].user_id,
          date_of_birth: newUser.rows[0].date_of_birth
        }
      });
    } else {
      res.status(500).json({ error: "Error al crear el usuario" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const verifyRefreshToken = async (token) => {
  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    return decoded.userId;
  } catch (error) {
    return null;
  }
};
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ error: "No se proporcionó token de refresco" });
    }

    const userId = await verifyRefreshToken(refreshToken);
    
    if (!userId) {
      return res.status(401).json({ error: "Token de refresco inválido" });
    }

    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const existingTokens = await userModel.getRefreshTokensByUserId(userId);
    if (existingTokens.length > 1) {
      await userModel.removeOldestRefreshToken(userId);
    }
    if (existingTokens.length === 0) {
      res.clearCookie('refreshToken', { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax' 
      });
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const newTokens = userModel.generateToken(user);
    await userModel.updateRefreshToken(userId, newTokens.refreshToken);
    
    res.cookie("refreshToken", newTokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });
    res.json({ accessToken: newTokens.accessToken, email: user.email });
  } catch (error) {
    console.error("Error al refrescar el token:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
const refreshCoockieCheck = async (req, res) => { 
  console.log('Ejecutando refreshCoockieCheck - Timestamp:', new Date().toISOString());
  try {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken) {
      res.json({ hasRefreshToken: true });
    } else {
      res.json({ hasRefreshToken: false });
    }
  } catch (error) {
    console.error('Error en prueba1:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
// router.post('/register', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         // Verificar si el usuario ya existe
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ msg: 'El correo ya está registrado.' });
//         }

//         // Hash de la contraseña
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Crear nuevo usuario
//         const newUser = new User({
//             email,
//             password: hashedPassword
//         });

//         await newUser.save();

//         res.status(201).json({ msg: 'Usuario registrado exitosamente' });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ msg: 'Error del servidor' });
//     }
// });
const logIn = async (req, res) => {
  try {
    const userData = await userModel.getUserByEmail({ email: req.body.email });
    if (!userData) {
      return res.status(400).json({ msg: "Usuario no encontrado" });
    }
    const passwordCompare = await bcrypt.compare(
      req.body.password,
      userData.password_hash
    );
    if (passwordCompare) {
      const tokens = userModel.generateToken(userData);
      await userModel.saveRefreshToken(userData.user_id, tokens.refreshToken);
      res.cookie('refreshToken', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 
      });
      res.status(200).json({
        full_name: userData.full_name,
        accessToken: tokens.accessToken,
        email: userData.email,
        user_id: userData.user_id,
        date_of_birth: userData.date_of_birth,
      });
    } else {
      res.status(400).json({ msg: "credenciales incorrectas" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const logOut = async (req, res) => {
  try {
    const userId = req.body.user_id;
    const result = await userModel.deleteToken(userId);

    if (result > 0) {
      res.clearCookie('refreshToken', { 
        httpOnly: true, 
        secure: false, 
        sameSite: 'lax' 
      });
      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } else {
      res
        .status(404)
        .json({
          error: "No se encuentra un token para los datos introducidos",
        });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const deleteUser = async (req, res) => {
  try {
    const { email, user_id } = req.body;
    const tryToLogout = await userModel.deleteToken(user_id);

    if (tryToLogout > 0) {
      const resultImage = await userModel.deleteUserImage(user_id);
      const result = await userModel.deleteUser(email);
      
      if (result && resultImage) {
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      } else {
        res.status(404).json({ error: "no se pudo eliminar el usuario" });
      }
    } else {
      const resultImage2 = await userModel.deleteUserImage(user_id)
      const result2 = await userModel.deleteUser(email);
      if (result2 && resultImage2) {
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      } else {
        res.status(404).json({ error: "no se pudo eliminar el usuario" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const getTokens = async (userId) => {
  try {
    const tokens = await userModel.getRefreshTokensByUserId(userId);

    if (tokens.length > 0) {
      return tokens;
    } else {
      return null;
    }
  }catch (error) {
    console.error("Error al obtener los tokens:", error);
    throw error;
  }
};
const getTokensByParams = async (req, res) => {
  try {
    const userId = req.params.userId; 
    const tokens = await userModel.getRefreshTokensByUserId(userId);

    if (tokens.length > 0) {
      res.status(200).json(tokens);
    } else {
      res
        .status(404)
        .json({ msg: "No se encontraron tokens para este usuario." });
    }
  } catch (error) {
    console.error("Error al obtener los tokens:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const updateUserImage = async (req, res) => {
  try {
    const { email } = req.body;
    const imageData = req.file.buffer;
    const imageMimeType = req.file.mimetype;

    const user = await userModel.getUserByEmail({ email });

    if (!req.file) {
      return res.status(400).json({ error: "No se proporcionó ninguna imagen" });
    }
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedImage = await userModel.updateUserImage(user.user_id, imageData, imageMimeType);

    if (updatedImage) {
      res.json({ message: "Imagen de usuario actualizada", image: updatedImage });
    } else {
      res.status(500).json({ error: "No se pudo actualizar la imagen" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};
function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
const getImage = async (req, res) => {
  const { userId } = req.params;
  try {
    if (!isValidUUID(userId)) {
      return res.status(400).json({ error: "Invalid user ID format" });
    }
    const userImage = await userModel.getUserImageById(userId);
    
    if (userImage) {
      res.contentType(userImage.image_mime_type);
      res.send(userImage.image_data);
    } else {
      res.status(404).json({ error: "Imagen de usuario no encontrada" });
    }
  } catch (error) {
    console.error('Error completo:', error);
    res.status(500).json({ 
      error: "Internal server error", 
      message: error.message,
      stack: error.stack
    });
  }
};
const getUserIdByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email no proporcionado" });
    }

    const user = await userModel.getUserByEmail({ email });
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const userId = user.user_id;
    res.json({ userId });
  } catch (error) {
    console.error("Error al obtener el id de usuario", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = {
  getAllUsers,
  getUser,
  createUser,
  logIn,
  logOut,
  deleteUser,
  verifyRefreshToken,
  refreshAccessToken,
  getTokens,
  refreshCoockieCheck,
  getTokensByParams,
  updateUserImage,
  getImage,
  createUserImageController,
  getUserIdByEmail
};
