import { getToken } from 'next-auth/jwt'
import { NextRequest, NextResponse } from 'next/server'
import toast from 'react-hot-toast';

export { default } from "next-auth/middleware"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;


  let userId, role;

  if (token) {
    userId = token._id;
    role = token.accountType;
  }


  const itemsUrl = '/api/items'
  let ratingsUrl = '/ratings'
  let userUrl = '/api/users'


  /********************************************************************************** 
   **************************ITEMS MIDDLEWARE****************************************
   **********************************************************************************/

  if (url.pathname.startsWith(`${itemsUrl}/createItem`) ||
    url.pathname.startsWith(`${itemsUrl}/deleteItem`) ||
    url.pathname.startsWith(`${itemsUrl}/updateItem`)
  ) {
    if (!userId) {
      toast.error('Please login to use this service');
      return NextResponse.json({
        success : false,
        message : 'Please login to coninue'
      },{
        status : 404
      })//.redirect(new URL('/log-in', request.url));
    } else if (userId && role === 'Customer') {
      toast.error('This route is protected for admins');
      return NextResponse.json({
        success : false,
        message : 'This is protected route for admins'
      }, {
        status : 404
      })//.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }
  
  /********************************************************************************** 
   **************************RATINGS MIDDLEWARE****************************************
   **********************************************************************************/
  if (
    url.pathname.startsWith(`${itemsUrl}${ratingsUrl}/createRating`) ||
    url.pathname.startsWith(`${itemsUrl}${ratingsUrl}/deleteRating`) ||
    url.pathname.startsWith(`${itemsUrl}${ratingsUrl}/editRating`)
  ) {
    if (!userId) {
      toast.error('Please login to use this service');
      return NextResponse.json({
        success : false,
        message : 'Please login to coninue'
      },{
        status : 404
      })//.redirect(new URL('/log-in', request.url));
    } else if (userId && role === 'Admin') {
      toast.error('This route is protected for customers');
      return NextResponse.json({
        success : false,
        message : 'This is protected route for customers'
      }, {
        status : 404
      })
      //.redirect(new URL('/', request.url));
    }
    return NextResponse.next();
  }

  /********************************************************************************** 
  **************************USER MIDDLEWARE****************************************
  **********************************************************************************/
  if (
    url.pathname.startsWith(userUrl) &&
    !url.pathname.startsWith(`${userUrl}/reactivateAccount`) &&
    !url.pathname.startsWith(`${userUrl}/forgotPassword`) &&
    !url.pathname.startsWith(`${userUrl}/signup`) 
  ) {
    if (!token || !userId || !role) {
      return NextResponse.redirect(new URL('/log-in', request.url));
    }
    return NextResponse.next();
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/items/:path*'
  ],
};