import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cartModel";
import Item, { ITEM } from "@/models/itemModel";
import { cartValidation } from "@/schemas/cartValidation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest) {
    await dbConnect();
    try {
        const { itemId ,  amount} = cartValidation.parse(await req.json()); 
        const token = await getToken({req});
        const cartId = token?.myCart;

        
        if(!cartId) {
            return NextResponse.json({
                success : false,
                message : 'Please login to continue',
            }, { 
                status : 400
            })
        }
        const role = token?.accounType;
        if (role === 'Admin') {
            return NextResponse.json({
                success: false,
                message: `Admins cannot add items in customer's cart`
            }, {
                status: 404
            })
        }
        
        const item = await Item.findById(itemId);
        if(!item) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a  valid item id'
            } , {
                status : 404
            })
        }
        let cart = await Cart.findById(cartId);
        if(!cart) {
            return NextResponse.json({
                success : false,
                message : 'No such cart found'
            },{
                status : 404
            })
        }

        cart = await Cart.findByIdAndUpdate(
            {cartId},
            {$push : {items : item._id} , $inc : {totalAmount : amount}},
            {new : true}
        ).populate('items').exec();

   

        return NextResponse.json({
            success : true,
            message : 'Item added to cart successfully',
            data : cart
        },{
            status : 200
        })
        
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while adding items to the cart please try again later',
            error : error.message
        } , {
            status : 500
        })
    }
}