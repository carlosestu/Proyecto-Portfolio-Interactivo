// src/models/user.js
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

const getUsers = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

const getUserById = async (userId) => {
  const   result = await pool.query("SELECT * FROM users WHERE user_id = $1", [
    userId,
  ]);
  return result.rows[0];
};

const createUser = async (user) => {
  const { email, password_hash, full_name, date_of_birth } = user;
  const result = await pool.query(
    "INSERT INTO users ( email, password_hash, full_name, date_of_birth) VALUES ($1, $2, $3, $4) RETURNING *",
    [ email, password_hash, full_name, date_of_birth ]
  );
  return result;
};
const getUserByEmail = async (userDataTry) => {
    const result = await pool.query(
      `SELECT * FROM users WHERE email=$1`,
      [userDataTry.email]
    );
    return result.rows[0];
  };
  const generateToken = (user) => {
    const accessToken = jwt.sign({ userId: user.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ userId: user.user_id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  
    return { accessToken, refreshToken };
  };
  
  const saveRefreshToken = async (userId, token) => {
    try {
      await pool.query(`
        INSERT INTO refresh_tokens (user_id, token, expires_at)
        VALUES ($1, $2, NOW() + INTERVAL '7 days')
      `, [userId, token]);
    } catch (error) {
      console.error("Error al guardar el token de refresco:", error);
    }
  };
  const deleteToken = async (userId) => {
    try {
      const result = await pool.query(`
        DELETE FROM refresh_tokens WHERE user_id = $1
        `, [userId]);
        return result.rowCount;
    } catch (error) {
      console.error("Error al eliminar el token:", error);
      throw error;
    }
  }
  const deleteUser = async (email) => {
    const result = await pool.query(
      'DELETE FROM users WHERE email = $1 RETURNING *',
      [email]
    );
    return result.rowCount > 0;
  };
  const getRefreshTokensByUserId = async (userId) => {
    const result = await pool.query(`SELECT * FROM refresh_tokens WHERE user_id = $1`, [userId]);
    return result.rows; 
  };
module.exports = { getUsers, saveRefreshToken, getUserById, createUser, getUserByEmail, generateToken, deleteUser, getRefreshTokensByUserId, deleteToken };
