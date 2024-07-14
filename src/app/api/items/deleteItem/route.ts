import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import RatingAndReviews from "@/models/ratingsModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req : NextRequest) {
    await dbConnect();
    try {
        const {itemId} = await req.json();
        if(!itemId) {
            return NextResponse.json({
                success : false,
                message : 'Please proide with an item id'
            }, {
                status : 400
            })
        }
        const item = await Item.findById(itemId);
        if(!item) {
            return NextResponse.json({
                success : false,
                message : 'No such Item found',
            },{
                status : 404
            })
        }

        if(item.ratingAndReviews.length !== 0) {
            for (const ratingId of item.ratingAndReviews) {
                await RatingAndReviews.findByIdAndDelete(ratingId);
            }
        }

        const deletedItem = await Item.findByIdAndUpdate(
            itemId,
            {deleted : true},
            {new : true}
        )

        return NextResponse.json({
            success : true,
            message : 'Item deleted successfully',
            data : deletedItem
        },{
            status : 200
        })
    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Error deleting item',
            error : error.message
        },{
            status : 500
        })
    }
}