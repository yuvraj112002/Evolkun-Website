import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST() {
  try {
    // ✅ Clear the "token" cookie by setting it to expire immediately
    cookies().set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: new Date(0),
      path: '/', // Ensure it's cleared site-wide
    });

    return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
  } catch (err) {
    console.error('Logout Error:', err);
    return NextResponse.json(
      { message: 'Logout failed', error: err.message },
      { status: 500 }
    );
  }
}

// await fetch('/api/auth/logout', {
//     method: 'POST',
//   });
  
