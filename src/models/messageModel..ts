import mongoose , {Schema , Document} from 'mongoose';
import { USER } from './userModel';

export interface MESSAGE extends Document {
    user : USER,
    description : string,
    // date : Date,
    maxDeleteDate : Date,
    deleteType : string,
    deletedBy : USER,
    // updateDate : Date
}

const messageSchema : Schema<MESSAGE> = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    } ,
    description : {
        type : String,
        required : true,
        trim : true
    } ,
    // date : {
    //     type : Date,
    //     default : Date.now()
    // } ,
    maxDeleteDate : {
        type : Date,
        default : () => new Date(Date.now() + 2 * 60 * 60 * 1000)
    } ,
    deleteType : {
        type : String,
        enum : ['Delete For Everyone' , 'Delete For Me']
    } ,
    deletedBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }
} , {
    timestamps : true
})

const Message = mongoose.models.Message as mongoose.Model<MESSAGE> ||
                mongoose.model('Message' , messageSchema);

export default Message;