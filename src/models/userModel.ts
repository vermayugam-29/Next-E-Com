import mongoose , {Schema , Document} from 'mongoose'
import {ORDER} from './orderModel';
import {CART} from './cartModel'
import { PROFILE } from './profileModel';

export interface USER extends Document {
    name : string,
    email : string,
    password : string,
    additionalInfo : PROFILE,
    accountType : string,
    myOrders : ORDER[],
    myCart : CART,
    deleteAccountDate : Date | null
}

const userSchema : Schema<USER> =  new mongoose.Schema({
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
    }
})

const User =  mongoose.models.User as mongoose.Model<USER> || mongoose.model('User' , userSchema);

export default User;