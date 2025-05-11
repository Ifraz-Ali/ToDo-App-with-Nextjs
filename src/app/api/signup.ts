import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '../../pages/database/connnection/database-connection';
import User from '../../pages/database/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

    const { username, email, password, gender } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        gender,
    });

    return res.status(201).json({ message: 'User created successfully.', user: newUser });
}
