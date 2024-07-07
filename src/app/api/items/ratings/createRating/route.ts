import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import Order from "@/models/orderModel";
import RatingAndReviews from "@/models/ratingsModel";
import User from "@/models/userModel";
import { ratingValidation } from "@/schemas/ratingSchema";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    await dbConnect();

    try {

        //can also add that user should have bought the item for it to be reviewed

        const { itemId, ratingStars, reviewDescription } = ratingValidation.parse(req.json());

        const token = await getToken({ req });
        const userId = token?._id;
        const orders = token?.myOrders;
        
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: 'Please log in to continue'
            }, {
                status: 400
            })
        }
        
        const role = token?.accounType;
        if (role === 'Admin') {
            return NextResponse.json({
                success: false,
                message: 'Admins cannot give reviews on their own items'
            }, {
                status: 404
            })
        }


        const item = await Item.findById(itemId);

        if (!item) {
            return NextResponse.json({
                success: false,
                message: 'Please proovide a valid item id to continue'
            }, {
                status: 404
            })
        }

        let hasUserPurchasedTheItem = false;

        if(orders?.length !== 0 && orders !== undefined) {
            // for(const orderId of orders) {
            //     const order = await Order.findOne(
            //         {_id : orderId , $in : {items : item._id}}
            //     )
            //     if(order) {
            //         hasUserPurchasedTheItem = true;
            //         break;
            //     }
            // }

            hasUserPurchasedTheItem = orders.some(async (orderId) => {
                const order = await Order.findOne({
                    _id: orderId,
                    items: item._id 
                });
                return order !== null;
            });
        }

        

        const rating = await RatingAndReviews.create(
            {
                postedBy: userId, item: itemId,
                ratingStars, reviewDescription,
                verifiedPurchase : hasUserPurchasedTheItem
            }
        );
        
        await Item.findByIdAndUpdate(
            {_id : item._id} ,
            {$push : {ratingAndReviews : rating._id}},
            {new : true}
        )

        const populatedRating = await RatingAndReviews.findById(rating._id)
                                    .populate('postedBy')
                                    .populate('item')
                                    .exec();

        return NextResponse.json({
            success: false,
            message: `Rated for ${item.name} with ${ratingStars} successfully`,
            data: populatedRating
        }, {
            status : 200
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Something went wrong while rating for the item',
            error: error.message
        }, {
            status: 500
        })
    }
}