import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js'; // Import the PostgreSQL pool
import asyncHandler from "../middleware/asyncHandler.js";


const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;


  const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
  const userCheckResult = await db.query(userCheckQuery, [email]);

  if (userCheckResult.rows.length > 0) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const insertUserQuery = `
    INSERT INTO users (username, email, password_hash)
    VALUES ($1, $2, $3)
    RETURNING user_id, username, email;
  `;

  const newUser = await db.query(insertUserQuery, [username, email, password_hash]);
  res.status(201).json({
    message: 'User registered successfully',
    user: newUser.rows[0],
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  const userCheckQuery = 'SELECT * FROM users WHERE email = $1';
  const userCheckResult = await db.query(userCheckQuery, [email]);

  if (userCheckResult.rows.length === 0) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const user = userCheckResult.rows[0];

  const isPasswordValid = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  // Generate a JWT token for the user
  const token = jwt.sign(
    {
      id: user.user_id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: '24h' } // Token valid for 24 hours
  );
  res.status(200).json({
    token,
    user: {
      id: user.user_id,
      username: user.username,
      email: user.email,
    },
  });
});

