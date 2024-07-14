import mongoose , {Schema , Document} from "mongoose";
import { ITEM , itemSchema } from "./itemModel";

// mongoose.model('Item' , itemSchema);

export interface CART extends Document {
    items : ITEM[],
    totalAmount : string
}

export const cartSchema : Schema<CART> = new mongoose.Schema({
    items : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Item',
    }],
    totalAmount : {
        type : String,
        required : true,
    }
})

const Cart = mongoose.models.Cart as mongoose.Model<CART> || mongoose.model('Cart' , cartSchema);
export default Cart;