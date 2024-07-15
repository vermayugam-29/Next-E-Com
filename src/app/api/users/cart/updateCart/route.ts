import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cartModel";
import Item from "@/models/itemModel";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req : NextRequest) => {
    await dbConnect();

    try {
        const {itemId , quantity} = await req.json();

        if(!itemId || !quantity) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with all the details to update item quantity',
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
                message : 'Please provide with a valid item id'
            }, {
                status : 404
            })
        }


        let cart = await Cart.findById(cartId)

        const quantityDetails = cart!.quantityOfItem.filter(q => q.item.toString() === itemId);
        let prevQuantity = quantityDetails[0].quantity;

        if(prevQuantity === quantity) {
            await cart!.save()
            .then(cart => cart.populate('items quantityOfItem.item'))
            .catch(err => console.log(err))
            return NextResponse.json({
                success : true,
                message : 'Cart updated successfully',
                data : cart
            },{
                status : 200
            })
        }

        else if(prevQuantity > quantity) {
            const amountToBeDeducted = (prevQuantity - quantity) * parseFloat(item.price);
            cart = await Cart.findOneAndUpdate(
                { _id: cartId, 'quantityOfItem.item': item._id },
                {
                    $inc: { totalAmount: -amountToBeDeducted },
                    $set: { 'quantityOfItem.$.quantity': quantity }
                },
                { new: true }
            ).populate('items').populate('quantityOfItem.item').exec();
        } else if(prevQuantity < quantity) {
            const amountToBeAdded = (quantity - prevQuantity) * parseFloat(item.price);
            cart = await Cart.findOneAndUpdate(
                { _id: cartId, 'quantityOfItem.item': item._id },
                {
                    $inc: { totalAmount: amountToBeAdded },
                    $set: { 'quantityOfItem.$.quantity': quantity }
                },
                { new: true }
            ).populate('items').populate('quantityOfItem.item').exec();
        }

        return NextResponse.json({
            success : true,
            message : 'Cart updated successfully',
            data : cart
        },{
            status : 200
        })
    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while updating cart',
            error : err.message
        }, {
            status : 500
        })
    }
}