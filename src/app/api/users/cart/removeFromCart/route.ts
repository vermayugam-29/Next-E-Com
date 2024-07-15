import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import Cart from "@/models/cartModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async(req : NextRequest) => {
    await dbConnect();
    try {
        const {itemId}  = await req.json();

        if(!itemId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a item id'
            }, {
                status : 400
            })
        }

        const token = await getToken({req});
        const cartId = token!.myCart;

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

        let quantityOfItem = 0;

        for(const quantityId of cart.quantityOfItem) {
            if(quantityId.item.toString() === itemId) {
                quantityOfItem = quantityId.quantity;
            } 
        }

        if (quantityOfItem === 0) {
            return NextResponse.json({
                success: false,
                message: 'Item not found in the cart'
            }, {
                status: 404
            });
        }

        let amountToBeDeducted = parseFloat(item.price) * quantityOfItem;

        cart = await Cart.findByIdAndUpdate(
            cartId,
            {
                $inc: { totalAmount: -amountToBeDeducted },
                $pull: { quantityOfItem: { item: itemId }, items: itemId }
            },
            { new: true }
        ).populate('items').populate('quantityOfItem.item').exec();


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