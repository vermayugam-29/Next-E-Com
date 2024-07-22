import mongoose, { Schema, Document } from "mongoose";
import {USER, userSchema} from "./userModel";
import {ITEM, itemSchema }  from "./itemModel";

// mongoose.models.User || mongoose.model('User' , userSchema);
// mongoose.models.Item || mongoose.model('Item' , itemSchema);

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
    mongoose.model<RATING>('RatingAndReviews', ratingSchema);


export default RatingAndReviews;