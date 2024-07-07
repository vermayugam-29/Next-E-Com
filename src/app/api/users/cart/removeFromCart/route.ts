import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import Cart from "@/models/cartModel";
import { cartValidation } from "@/schemas/cartValidation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req : NextRequest) => {
    await dbConnect();
    try {
        const {itemId , amount}  = cartValidation.parse(req.json());
        const token = await getToken({req});
        const cartId = token?.myCart;

        if(!cartId) {
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            } , {
                status : 400
            })
        }

        const role = token?.accounType;
        if (role === 'Admin') {
            return NextResponse.json({
                success: false,
                message: `Admins cannot remove items from customer's cart`
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

        if(cart.items.length === 0) {
            return NextResponse.json({
                success : false,
                message : 'No items in the cart to be removed',
            },{
                status : 404
            })
        }

        cart = await Cart.findByIdAndUpdate(
            {cartId},
            {$pull : {items : item._id} , $inc : {totalAmount : -amount}},
            {new : true}
        ).populate('items').exec();


        return NextResponse.json({
            success : true,
            message : 'Item removed from cart successfully',
            data : cart
        },{
            status : 200
        })
    } catch(error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong whhile removing item from your cart',
            error : error.message
        } , {
            status : 500
        })
    }
}