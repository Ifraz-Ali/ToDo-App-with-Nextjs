import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/database/connnection/database-connection';
import User from '@/lib/database/models/User';

export async function POST(req: NextRequest) {
    try {
        const { username, email, password, gender } = await req.json();

        if (!username || !email || !password) {
            return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
        }
        console.log('Starting signup');
        await dbConnect();
        console.log(' DB connected');
        const existingUser = await User.findOne({ email });
        console.log(' Checked existing user');

        if (existingUser) {
            return NextResponse.json({ message: 'Email already in use.' }, { status: 409 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        console.log('🔐 Password hashed');
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            gender,
        });
        console.log('User created:', newUser);
        return NextResponse.json({ message: 'User created successfully.', user: newUser }, { status: 201 });

    } catch (error) {
        console.error('Signup error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
