import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import RatingAndReviews from "@/models/ratingsModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req : NextRequest) {
    await dbConnect();

    try {
        const {itemId} = await req.json();

        if(!itemId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with item id to fetch reviews'
            } , {
                status : 400
            })
        }

        const item = await Item.findById(itemId);

        if(!item) {
            return NextResponse.json({
                success : false,
                message : 'Please provide a valid item id'
            } , {
                status : 404
            })
        }

        const ratings = await RatingAndReviews.find({item : itemId})
                                    .sort({ratingStars: -1})
                                    .populate('postedBy').exec();

        return NextResponse.json({
            success : true,
            message : 'All ratings related to items fetched successfully',
            data : ratings
        } , {
            status : 200
        })
    } catch(err : any) {
        return NextResponse.json({
            success : false,
            message : 'Error fetching item reviews',
            error : err.message
        } , {
            status : 200
        })
    }
}