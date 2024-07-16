export const adminProtectedRoutes = [
    '/api/users/orders/acceptOrder', '/api/users/orders/rejectOrder',
    '/api/users/orders/deliveredOrder', '/api/items/createItem',
    '/api/items/deleteItem', 'api/items/updateItem'
];
  
export const customerProtectedRoutes = [
    '/api/users/orders/createOrder', '/api/users/orders/cancelOrder',
    '/api/users/cart', '/api/users/address', '/api/items/ratings/createRating',
    '/api/items/ratings/deleteRating', '/api/items/ratings/editRating'
  ];
  
export const protectedRoutes = [
    '/api/users/changePassword', '/api/users/chats',
    '/api/users/deactivateAccount', '/api/users/profile',
    '/api/users/logOut' , '/api/users/orders/getOrderDetails',
    '/api/users/orders/getAllOrders'
]

export const authProtected = [
    '/api/auth/callback/credentials' , '/api/auth/csrf'
]