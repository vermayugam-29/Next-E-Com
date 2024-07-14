import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();

type ConnectedObject = {
    isConnected? : number
}

const connection : ConnectedObject = {}

async function dbConnect() : Promise<void> {
    if(connection.isConnected){
        console.log('Already connected to database');
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URL! , {
        });
        connection.isConnected = db.connections[0].readyState;

        console.log('DB connected successfully');
    } catch (error) {
        console.log('Error connecting to database');
        process.exit(1);
    }
}

export default dbConnect;