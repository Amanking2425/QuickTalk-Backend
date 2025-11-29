import {StreamChat} from "stream-chat";
import "dotenv/config"
 
const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;

 if(!apiKey || !apiSecret){
console.error("Secret Keys or API key are missing")
}

const streamClient = StreamChat.getInstance(apiKey, apiSecret);

export const upsertStreamUser = async (userData) =>{
    try{
        await streamClient.upsertUsers([userData]);
        return userData;
    }catch(error){
        console.log("Error in upserting Stream user:",error);
    }
};

export const generateStreamToken = (userId) => {
    try{
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    }catch(error){
        console.error("Error generating Stream token:", error);
        throw new Error("Failed to generate Stream token");
    }
}

