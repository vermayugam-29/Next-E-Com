import mongoose , {Schema , Document} from 'mongoose'
import {ORDER, orderSchema } from './orderModel';
import {CART, cartSchema } from './cartModel'
import { PROFILE , profileSchema } from './profileModel';
import { CHAT, chatSchema } from './chatModel';

// mongoose.models.Profile || mongoose.model('Profile' , profileSchema);
// mongoose.models.Chat || mongoose.model('Chat' , chatSchema);
// mongoose.models.Order || mongoose.model('Order' , orderSchema);
// mongoose.models.Cart || mongoose.model('Cart' , cartSchema);


export interface USER extends Document {
    name : string,
    email : string,
    password : string,
    additionalInfo : PROFILE,
    accountType : string,
    myOrders : ORDER[],
    myCart : CART,
    deleteAccountDate : Date | null,
    chat : CHAT[]
}

export const userSchema : Schema<USER> =  new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    } ,
    email : {
        type : String,
        required : true,
        trim : true
    } ,
    password : {
        type : String ,
        required : true
    },
    accountType : {
        type : String,
        enum : ['Admin' , 'Customer'],
        required : true,
    } , 
    myOrders : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Order'
    }],
    myCart : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Cart'
    },
    additionalInfo : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Profile'
    },
    deleteAccountDate : {
        type : Date,
        default : null
    },
    chat : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Chat'
    }]
},{
    timestamps : true
})

const User =  mongoose.models.User as mongoose.Model<USER> || 
                mongoose.model<USER>('User' , userSchema);

export default User;