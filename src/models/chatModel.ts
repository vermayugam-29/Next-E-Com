import mongoose , {Schema , Document} from 'mongoose';
import { MESSAGE } from './messageModel.';

export interface CHAT extends Document {
    messages : MESSAGE[]
}

const chatSchema : Schema<CHAT> = new mongoose.Schema({
    messages : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Message'
    }]
})

const Chat = mongoose.models.Chat as mongoose.Model<CHAT> || 
                mongoose.model('Chat' , chatSchema);

export default Chat;