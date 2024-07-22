import mongoose, { Schema, Document } from "mongoose";
import { ITEM , itemSchema} from "./itemModel";

// mongoose.models.Item || mongoose.model('Item' , itemSchema);


export interface QUANTITY extends Document {
    item: ITEM,
    quantity: number
}

export interface CART extends Document {
    items: ITEM[],
    totalAmount: number,
    quantityOfItem: QUANTITY[]
}

export const cartSchema: Schema<CART> = new mongoose.Schema({
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
        required : true
    }],
    totalAmount: {
        type: Number,
        required: true,
        default : 0
    },
    quantityOfItem: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item',
            required : true
        },
        quantity : {
            type : Number,
            required : true
        }
    }]
}, {
    timestamps: true
})

const Cart = mongoose.models.Cart as mongoose.Model<CART> ||
 mongoose.model<CART>('Cart', cartSchema);
export default Cart;