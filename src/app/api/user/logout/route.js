// Structure: /app/api/user/logout/route.js
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.set('token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0,
    path: '/',
  });

  return Response.json({ success: true, message: 'Logged out successfully' });
}
