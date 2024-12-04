const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const pool = require("../config/db");
require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_TOKEN_SECRET // Usar el secreto para tokens de acceso
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await pool.query('SELECT * FROM users WHERE user_id = $1', [jwt_payload.userId]);
    if (user.rows.length > 0) {
      return done(null, user.rows[0]);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;