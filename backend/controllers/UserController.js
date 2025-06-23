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
        const userId = req.user.id; 
        const { username, email,password } = req.body;

        if (email !== req.user.email) {

            const {data:existingUser, error} = await db.from('users').select().eq('email', email);
            if (error) {
                return res.status(500).json({ message: 'Database error' });
            }
            if (existingUser.length> 0) {
                return res.status(400).json({ message: 'Email already in use' });
            }
        }

        const isUsernameSame = username === req.user.username;
        const isEmailSame = email === req.user.email;

        const fields = {};

        if (!isUsernameSame) {
            fields.username = username;
        }
        if (!isEmailSame) {
            fields.email = email;
        }
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            fields.password_hash = hashedPassword;
        }

        if (isUsernameSame && isEmailSame && !password) {
            return res.status(200).json({ message: 'No changes detected' });
        }

        const {data,error} = await db.from("users").update({
            ...fields
        }).eq('user_id', userId).select();



        if (data.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }


        const token = jwt.sign(
            {
                id: userId,
                username,
                email,
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        
        res.status(200).json({
            message: 'User updated successfully',
            token
        });

    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


