import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cartModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const GET = async(req : NextRequest) => {
    await dbConnect();

    try {
        const token = await getToken({req});
        const cartId = token!.myCart;

        const cart = await Cart.findById(cartId)
        .populate('items').populate('quantityOfItem.item').exec();

        if(!cart) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a valid cart id to fectch details'
            }, {
                status : 404
            })
        }

        return NextResponse.json({
            success : true,
            message : 'Successfully fectched cart details',
            data : cart
        }, {
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message: 'Something went wrong while fetching card details',
            error : error.message
        }, {
            status : 500
        })
    }
}