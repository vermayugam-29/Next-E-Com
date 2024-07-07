import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cartModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {
        const token = await getToken({req});
        const cartId = token?.myCart;

        if(!cartId) {
            return NextResponse.json({
                success : false,
                message : 'Please login to empty the cart'
            } , {
                status : 400
            })
        }

        const role = token?.accounType;
        if (role === 'Admin') {
            return NextResponse.json({
                success: false,
                message: 'Admins cannot empty customers cart'
            }, {
                status: 404
            })
        }

        const cart = await Cart.findById(cartId);

        if(!cart) {
            return NextResponse.json({
                success : false,
                message : 'No such cart found please provide a valid cartId',
            },{
                status : 404
            })
        }

        cart.items = [];
        cart.totalAmount = '0';

        await cart.save();

        return NextResponse.json({
            success : true,
            message : 'Your cart is empty',
            data : cart
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while emptying the cart',
            error : error.message
        } , {
            status : 500
        })
    }
}