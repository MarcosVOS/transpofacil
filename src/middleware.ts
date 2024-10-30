import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './utils/jwt';

export async function middleware(request: NextRequest) {
  try {
    const cookie = cookies().get('transpofacil-v.1.0.0');

    if (!cookie && request.nextUrl.pathname.includes('home')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    if (cookie && request.nextUrl.pathname == '/') {
      return NextResponse.redirect(new URL('/home', request.url));
    }
  } catch (error) {
    console.log('error: ', error);
  }
}
