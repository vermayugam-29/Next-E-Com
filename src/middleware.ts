import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import toast from 'react-hot-toast';
import { adminProtectedRoutes, authProtected, customerProtectedRoutes, protectedRoutes }
  from './utils/protectedRouteConfig';

export { default } from "next-auth/middleware"


export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;


  let userId, role;

  if (token) {
    userId = token._id;
    role = token.accountType;
  }

  const loginResponse = NextResponse.json({
    success: false,
    message: 'Please login to continue'
  }, {
    status: 401
  });

  const roleResponse = (e: string) => {
    return NextResponse.json({
      success: false,
      message: `This service is only provided to ${e}'s`
    }, {
      status: 403
    });
  }


  const isCustomerProtected = customerProtectedRoutes.some(route => url.pathname.startsWith(route));
  const isAdminProtected = adminProtectedRoutes.some(route => url.pathname.startsWith(route));
  const isProtected = protectedRoutes.some(route => url.pathname.startsWith(route));
  const isAuthProtected = authProtected.some(route => url.pathname.startsWith(route));

  if (isCustomerProtected) {
    if (!userId) {
      return loginResponse;
    } else if (role !== 'Customer') {
      return roleResponse('Customer');
    }
    return NextResponse.next();
  }

  else if (isAdminProtected) {
    if (!userId) {
      return loginResponse;
    } else if (role !== 'Admin') {
      return roleResponse('Admin');
    }
    return NextResponse.next();
  }

  else if (isProtected) {
    if (!userId) {
      return loginResponse;
    }
    return NextResponse.next();
  }

  else if(isAuthProtected) {
    if(userId) {
      return NextResponse.json({
        success : false,
        message : 'You need to logOut first to login to another account'
      }, {
        status : 401
      })
    }
    return NextResponse.next();
  }



  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/items/:path*',
    '/api/auth/:path*'
  ],
};
