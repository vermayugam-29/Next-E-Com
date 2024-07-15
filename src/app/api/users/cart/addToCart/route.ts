import dbConnect from "@/lib/dbConnect";
import Cart from "@/models/cartModel";
import Item from "@/models/itemModel";
import { cartValidation } from "@/schemas/cartValidation";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const { itemId, amount, quantity } = cartValidation.parse(await req.json());
        const token = await getToken({ req });
        const cartId = token!.myCart;

        const item = await Item.findById(itemId);

        if (!item) {
            return NextResponse.json({
                success: false,
                message: 'Please provide a valid item id'
            }, {
                status: 404
            });
        }

        if (quantity > item.stockAvailable) {
            return NextResponse.json({
                success: false,
                message: 'This much stock is not available, please contact admin or reduce stock'
            }, {
                status: 400
            });
        }

        if (parseFloat(amount.toString()) !== (quantity * parseFloat(item.price))) {
            return NextResponse.json({
                success: false,
                message: 'Amount does not match with item price'
            }, {
                status: 400
            });
        }

        let cart = await Cart.findById(cartId);
        if (!cart) {
            return NextResponse.json({
                success: false,
                message: 'No such cart found'
            }, {
                status: 404
            });
        }

        const itemInCart = cart.quantityOfItem.find(q => q.item.toString() === itemId);

        if (itemInCart) {
            cart = await Cart.findOneAndUpdate(
                { _id: cartId, "quantityOfItem.item": itemId },
                {
                    $inc: {
                        "quantityOfItem.$.quantity": quantity,
                        totalAmount: amount
                    }
                },
                { new: true }
            ).populate('items')
             .populate('quantityOfItem.item')
             .exec();
        } else {
            const itemQuan = {
                item: itemId,
                quantity: quantity
            };

            cart = await Cart.findByIdAndUpdate(
                cartId,
                {
                    $push: { items: item._id, quantityOfItem: itemQuan },
                    $inc: { totalAmount: amount }
                },
                { new: true }
            ).populate('items')
             .populate('quantityOfItem.item')
             .exec();
        }

        return NextResponse.json({
            success: true,
            message: 'Item added to cart successfully',
            data: cart
        }, {
            status: 200
        });

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong while adding items to the cart. Please try again later.',
            error: error.message
        }, {
            status: 500
        });
    }
}


// import dbConnect from "@/lib/dbConnect";
// import Cart from "@/models/cartModel";
// import Item, { ITEM } from "@/models/itemModel";
// import { cartValidation } from "@/schemas/cartValidation";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { findDOMNode } from "react-dom";

// export async function POST(req : NextRequest) {
//     await dbConnect();
//     try {
//         const { itemId ,  amount , quantity} = cartValidation.parse(await req.json()); 
//         const token = await getToken({req});
//         const cartId = token!.myCart;


        
//         const item = await Item.findById(itemId);

//         if(!item) {
//             return NextResponse.json({
//                 success : false,
//                 message : 'Please provide with a  valid item id'
//             } , {
//                 status : 404
//             })
//         }

//         if(quantity > item.stockAvailable) {
//             return NextResponse.json({
//                 success : false,
//                 message : 'This much stock is not available please conatact admin or reduce stock'
//             }, {
//                 status : 400
//             })
//         }

//         if(amount != ((quantity) * parseFloat(item.price))){
//             return NextResponse.json({
//                 success : false,
//                 message : 'Amount does not match with item price'
//             }, {
//                 status : 400
//             })
//         }

//         let cart = await Cart.findOne(
//             {_id : cartId , items : itemId}
//         );

//         if(cart) {
//             cart = await Cart.findByIdAndUpdate(
//                 cartId,
//                 {
//                     quantityOfItem : {
//                         item : {itemId},
//                         $inc : {quantity : quantity}
//                     }
//                 },
//                 {new : true}
//             ).populate('items')
//             .populate('quantityOfItem.item')
//             .exec();

//             return NextResponse.json({
//                 success : true,
//                 message : 'Item added to cart successfully',
//                 data : cart
//             },{
//                 status : 200
//             })
//         }

//         cart = await Cart.findById(cartId);
//         if(!cart) {
//             return NextResponse.json({
//                 success : false,
//                 message : 'No such cart found'
//             },{
//                 status : 404
//             })
//         }

//         const itemQuan = {
//             item : itemId,
//             quantity : quantity
//         }

//         cart = await Cart.findByIdAndUpdate(
//             cartId,
//             {
//                 $push : {items : item._id , quantityOfItem : itemQuan} ,
//                 $inc : {totalAmount : parseFloat(amount.toString())} 
//             },
//             {new : true}
//         ).populate('items')
//         .populate('quantityOfItem.item')
//         .exec();

   

//         return NextResponse.json({
//             success : true,
//             message : 'Item added to cart successfully',
//             data : cart
//         },{
//             status : 200
//         })
        
//     } catch (error : any) {
//         return NextResponse.json({
//             success : false,
//             message : 'Something went wrong while adding items to the cart please try again later',
//             error : error.message
//         } , {
//             status : 500
//         })
//     }
// }