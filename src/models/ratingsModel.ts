import mongoose, { Schema, Document } from "mongoose";
import {USER} from "./userModel";
import {ITEM }  from "./itemModel";


export interface RATING extends Document {
    postedBy: USER,
    item: ITEM ,
    ratingStars: number,
    reviewDescription: string,
    verifiedPurchase : boolean
}

export const ratingSchema: Schema<RATING> = new mongoose.Schema({
    postedBy: {
        type : mongoose.Schema.Types.ObjectId,
        ref : `User`,
        required : true
    },
    item: {
        type : mongoose.Schema.Types.ObjectId,
        ref : `Item`,
        required : true
    },
    ratingStars: {
        type : Number,
        required : true,
    },
    reviewDescription: {
        type : String,
        required : true
    },
    verifiedPurchase : {
        type : Boolean,
        required : true
    },
    
} , {
    timestamps : true
})

const RatingAndReviews = mongoose.models.RatingAndReviews as mongoose.Model<RATING> ||
    mongoose.model('RatingAndReviews', ratingSchema);


export default RatingAndReviews;