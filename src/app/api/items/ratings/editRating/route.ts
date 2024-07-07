import dbConnect from "@/lib/dbConnect";
import { ratingValidation } from "@/schemas/ratingSchema";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt'
import RatingAndReviews from "@/models/ratingsModel";


export const PUT = async(req : NextRequest) => {
    await dbConnect();

    try {

        //here itemId indicates as  rating id
        //changed name because i needed to do validation using zod
        //and in ratingSchema of zod validation i have used itemId as a keyword
        const { itemId , reviewDescription , ratingStars } = ratingValidation.parse(req.json());

        const ratingId = itemId;

        const token = await getToken({req});
        const userId = token?._id;
        const role = token?._accountType;

        if(!userId || !role) {
            return NextResponse.json({
                success : false,
                message : 'Please login to continue'
            } , {
                status : 404
            })
        }

        if(role === 'Admin') {
            return NextResponse.json({
                success : false,
                message : 'Admins cannot edit user reviews'
            } , {
                status : 400
            })
        }

        const rating = await RatingAndReviews.findById(ratingId);

        if(!rating) {
            return NextResponse.json({
                success : false,
                message : 'No such review found'
            } , {
                status : 400
            })
        }

        if(rating.postedBy.toString() !== userId) {
            return NextResponse.json({
                success : false,
                message : 'You cannot edit review posted by someone else'
            } , {
                status : 404
            })
        }

        if(reviewDescription) {
            rating.reviewDescription = reviewDescription;
        }
        if(ratingStars) {
            rating.ratingStars = parseInt(ratingStars);
        }

        await rating.save().then(rating => rating.populate('postedBy item'));

        return NextResponse.json({
            success : true,
            message : 'Review edited successfully',
            data : rating
        }, {
            status : 200
        })

    } catch (error : any) {
        return NextResponse.json({
            success : false,
            message : 'Something went wrong please try again later',
            error : error.message
        },{
            status : 500
        })
    }
}