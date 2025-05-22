import db from '../db.js';
import asyncHandler from '../middleware/asyncHandler.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;


export const getUserById = asyncHandler( async(req, res) => {
    
    
    try {
        const user = req.user; // Assuming user_id is stored in req.user after authentication
        
    
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
})

export const updateUserById = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id; // Assuming user ID is in req.user
        const { username, email,password } = req.body;

        // Check if the new email is the same as the current user's email
        if (email !== req.user.email) {
            // Check if the new email already exists in the database
            const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);
            if (existingUser.rows.length > 0) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        const isUsernameSame = username === req.user.username;
        const isEmailSame = email === req.user.email;

        const fields = [];
        const values = [];

        if (!isUsernameSame) {
            fields.push('username = $1');
            values.push(username);
        }
        if (!isEmailSame) {
            fields.push(`email = $${fields.length + 1}`);
            values.push(email);
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.push(`password_hash = $${fields.length + 1}`);
            values.push(hashedPassword);
        }

        if (fields.length === 0) {
            return res.status(200).json({ message: 'No changes detected' });
        }

        values.push(userId);

        const result = await db.query(
            `UPDATE users SET ${fields.join(', ')} WHERE user_id = $${values.length}`,
            values
        );

        if (result.rows.affectedRows === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Fetch updated user
        

        const token = jwt.sign(
            {
                id: userId,
                username: username,
                email: email,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        
        res.status(200).json({
            message: 'User updated successfully',
            token
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});


