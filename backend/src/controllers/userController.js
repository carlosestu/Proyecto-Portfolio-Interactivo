// src/controllers/userController.js
const jwt = require("jsonwebtoken");
const userModel = require("../models/users");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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
      res.status(400).json({ msg: "el usuario ya existe en la base de datos" });
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const newUser = await userModel.createUser({
        ...req.body,
        password_hash: hashedPassword,
      });
      // Verificar si newUser.rows está definido y no es vacío
      if (newUser && newUser.rows && newUser.rows.length > 0) {
        const tokens = userModel.generateToken(newUser.rows[0]);
        await userModel.saveRefreshToken(newUser.rows[0].user_id, tokens.refreshToken);
        res.status(201).json({ msg: "Usuario creado", accessToken: tokens.accessToken, refreshToken: tokens.refreshToken });
      } else {
        res.status(500).json({ error: "Error al crear el usuario" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
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
    const refreshToken = req.body.refreshToken;
    const userId = await verifyRefreshToken(refreshToken);

    if (!userId) {
      return res.status(401).json({ error: 'Token de refresco inválido' });
    }

    const user = await userModel.getUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    const newTokens = userModel.generateToken(user);
    await userModel.saveRefreshToken(userId, newTokens.refreshToken);

    res.json({ accessToken: newTokens.accessToken, refreshToken: newTokens.refreshToken });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
    console.error(error);
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
      res.status(200).json({
        full_name: userData.full_name,
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
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
      res.status(200).json({ message: "Sesión cerrada correctamente" });
    } else {
      res.status(404).json({ error: "No se encuentra un token para los datos introducidos" });
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
      const result = await userModel.deleteUser(email);
      if (result) {
        res.status(200).json({ message: "Usuario eliminado correctamente" });
      } else {
        res.status(404).json({ error: "no se pudo eliminar el usuario" });
      }
    } else {
      res.status(404).json({ error: "No se encuentra un token para los datos introducidos" });
    }
    
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
};
const getTokens = async (req, res) => {
  try {
    const userId = req.params.userId; // Asumiendo que pasas el userId como parámetro
    const tokens = await userModel.getRefreshTokensByUserId(userId);

    if (tokens.length > 0) {
      res.status(200).json(tokens);
    } else {
      res.status(404).json({ msg: "No se encontraron tokens para este usuario." });
    }
  } catch (error) {
    console.error("Error al obtener los tokens:", error);
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
  getTokens
};
