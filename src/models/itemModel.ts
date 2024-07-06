import mongoose , {Schema , Document} from "mongoose";
import { RATING } from "./ratingsModel";

//still can be improved more like adding how many people buyed till now
export interface ITEM extends Document {
    name : string,
    description : string,
    price : string,
    ratingAndReviews : RATING[],
    averageRating : string,
    soldCount : number
    mainImage : string,
    images : string[],
    stockAvailable : number,
    deleted : boolean,
}

const itemSchema : Schema<ITEM> = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    mainImage  : {
        type : String,
        required : true
    },
    images : [{
        type : String,
    }],
    price : {
        type : String,
        required : true,
    },
    stockAvailable : {
        type : Number,
        required : true,
    },
    description : {
        type : String ,
        required : true
    },
    ratingAndReviews : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'RatingAndReviews'
    }],
    deleted : {
        type : Boolean,
        default : false
    },
    averageRating : {
        type : String,
        default : 'No ratings yet'
    },
    soldCount : {
        type : Number, 
        default : 0
    }
});

const Item = mongoose.models.Item as mongoose.Model<ITEM> || mongoose.model('Item' , itemSchema);
export default Item;