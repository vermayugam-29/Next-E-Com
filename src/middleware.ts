import { getToken } from 'next-auth/jwt'
import { NextRequest , NextResponse } from 'next/server'


 
export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
    const token = await getToken({req : request});
    const url = request.nextUrl;

    // if(token && 
    //     (
    //         url.pathname.startsWith('/logIn') || 
    //         url.pathname.startsWith('/signUp') || 
    //         url.pathname.startsWith('/verifyOtp') || 
    //         url.pathname.startsWith('/')
    //     )
    // ) {
    //     return NextResponse.redirect(new URL('/dashboard'  , request.url))
    // }

    //checking if token is present
    if(!token && url.pathname.startsWith('/view-orders')) {
        return NextResponse.redirect(new URL('/' , request.url))
    }
    //while creating orders check  if token and then check if role is admin
    
    

  return NextResponse.redirect(new URL('/home', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // '/logIn',
    // '/signUp',
    // '/',
    // '/dashboard/:path*',
    // '/verifyOtp'
  ]
}