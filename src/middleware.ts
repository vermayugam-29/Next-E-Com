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
    role = token.accounType;
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
      return NextResponse.redirect(new URL('/log-in', request.url));
    } else if (userId && role !== 'Admin') {
      toast.error('This route is protected for admins');
      return NextResponse.redirect(new URL('/', request.url));
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
      return NextResponse.redirect(new URL('/log-in', request.url));
    } else if (userId && role !== 'Customer') {
      toast.error('This route is protected for admins');
      return NextResponse.redirect(new URL('/', request.url));
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

/*
*****************************MORE CLEAN CODE*******************************************
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export { default } from 'next-auth/middleware';

const ITEMS_URL = '/api/items';
const RATINGS_URL = '/ratings';
const USER_URL = '/api/users';

const isAdmin = (role) => role === 'Admin';
const isCustomer = (role) => role === 'Customer';

const handleRedirect = (request, path) => {
  return NextResponse.redirect(new URL(path, request.url));
};

const handleItemsMiddleware = (url, userId, role, request) => {
  if (
    url.pathname.startsWith(`${ITEMS_URL}/createItem`) ||
    url.pathname.startsWith(`${ITEMS_URL}/deleteItem`) ||
    url.pathname.startsWith(`${ITEMS_URL}/updateItem`)
  ) {
    if (!userId) {
      return handleRedirect(request, '/log-in');
    } else if (userId && !isAdmin(role)) {
      return handleRedirect(request, '/');
    }
  }
  return null;
};

const handleRatingsMiddleware = (url, userId, role, request) => {
  if (
    url.pathname.startsWith(`${ITEMS_URL}${RATINGS_URL}/createRating`) ||
    url.pathname.startsWith(`${ITEMS_URL}${RATINGS_URL}/deleteRating`) ||
    url.pathname.startsWith(`${ITEMS_URL}${RATINGS_URL}/editRating`)
  ) {
    if (!userId) {
      return handleRedirect(request, '/log-in');
    } else if (userId && !isCustomer(role)) {
      return handleRedirect(request, '/');
    }
  }
  return null;
};

const handleUserMiddleware = (url, token, userId, role, request) => {
  if (
    url.pathname.startsWith(USER_URL) &&
    !url.pathname.startsWith(`${USER_URL}/reactivateAccount`) &&
    !url.pathname.startsWith(`${USER_URL}/forgotPassword`) &&
    !url.pathname.startsWith(`${USER_URL}/signup`)
  ) {
    if (!token || !userId || !role) {
      return handleRedirect(request, '/log-in');
    }
  }
  return null;
};

export async function middleware(request) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  let userId, role;
  if (token) {
    userId = token._id;
    role = token.accounType;
  }

  const itemsMiddlewareResponse = handleItemsMiddleware(url, userId, role, request);
  if (itemsMiddlewareResponse) return itemsMiddlewareResponse;

  const ratingsMiddlewareResponse = handleRatingsMiddleware(url, userId, role, request);
  if (ratingsMiddlewareResponse) return ratingsMiddlewareResponse;

  const userMiddlewareResponse = handleUserMiddleware(url, token, userId, role, request);
  if (userMiddlewareResponse) return userMiddlewareResponse;

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/api/users/:path*',
    '/api/items/:path*'
  ],
};

*/