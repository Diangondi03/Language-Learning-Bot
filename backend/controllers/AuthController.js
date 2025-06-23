import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import * as asyncHandlerModule from "../middleware/asyncHandler.js";
const asyncHandler = asyncHandlerModule.default;


const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  const {data,error} = await db.from('users').select().eq('email', email);
  if (error) {
    return res.status(500).json({ message: 'Database error' });
  }

  if (data.length > 0) {
    return res.status(400).json({ message: 'Email is already in use' });
  }
  const password_hash = await bcrypt.hash(password, 10);



  const {data:userData,error:userError} = await db.from('users').insert({
    username,
    email,
    password_hash
  }).select('user_id, username, email').single();

  if (userError) {
    return res.status(500).json({ message: 'Database error' });
  }


  res.status(201).json({
    message: 'User registered successfully',
    user: userData,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const {data:userData,error:userError} = await db.from('users').select().eq('email', email);

  if (userError) {
    return res.status(500).json({ message: 'Database error' });
  }

  if (!userData || userData.length === 0) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }
  const user = userData[0];

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

