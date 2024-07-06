import mongoose , {Schema , Document} from "mongoose";
import { ITEM } from "./itemModel";
import { USER } from "./userModel";

export interface CART extends Document {
    user : USER,
    items : ITEM[],
    totalAmount : string
}

const cartSchema : Schema<CART> = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    } ,
    items : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Item',
        required : true,
    }],
    totalAmount : {
        type : String,
        required : true,
        trim : true
    }
})

const Cart = mongoose.models.Cart as mongoose.Model<CART> || mongoose.model('Cart' , cartSchema);
export default Cart;