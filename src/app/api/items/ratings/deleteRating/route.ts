import dbConnect from "@/lib/dbConnect";
import Item from "@/models/itemModel";
import RatingAndReviews from "@/models/ratingsModel";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async(req : NextRequest) => {
    await dbConnect();

    try {
        const {ratingId} = await req.json();

        if(!ratingId) {
            return NextResponse.json({
                success : false,
                message : 'Please provide with a rating id to delete your review' 
            } , {
                status : 400
            })
        }

        const rating = await RatingAndReviews.findById(ratingId);

        if(!rating) {
            return NextResponse.json({
                success : false,
                message : 'Review not found'
            },{
                status : 404
            })
        }

        await Item.findOneAndUpdate(
            {ratingAndReviews : rating._id},
            {$pull : {ratingAndReviews : rating._id}},
            {new : true}
        );

        await RatingAndReviews.findByIdAndDelete(rating._id);

        return NextResponse.json({
            success : true,
            message : 'Review deleted successfully',
            data : ratingId
        } , {
            status : 200
        })

    } catch (err : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong while deleting your review',
            error : err.message
        } , {
            status  : 500
        })
    }
}