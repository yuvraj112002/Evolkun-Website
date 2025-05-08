import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { connectToDatabase } from "@lib/mongoose"; // your MongoDB connection
import User from "@models/User"; // your Mongoose user model
import { generateToken } from '@lib/jwt'; // your JWT token logic

export async function POST(req) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { email, password } = body;

    // ✅ Edge Case 1: Missing email or password
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email });

    // ✅ Edge Case 2: User not found
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const isMatch = await user.comparePassword(password);

    // ✅ Edge Case 3: Wrong password
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const token = generateToken(user._id);
    const cookieStore = await cookies();
    // ✅ Set cookie securely
    cookieStore().set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 24 * 60 * 60 * 30, // 1 day
      path: '/',
    });

    return NextResponse.json(
      { message: 'Login successful', userId: user._id },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);

    // ✅ Edge Case 4: JSON parsing or server issue
    return NextResponse.json(
      { message: 'Login failed', error: error.message || 'Unexpected error' },
      { status: 500 }
    );
  }
}
