import { NextRequest } from "next/server";
import { uploadToCloudinary } from "./uploadCloudinary";

export async function uploadHelper(req : NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        const fileBuffer = await file.arrayBuffer();

        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");

        const fileUri = "data:" + mimeType + ";" + encoding + "," + base64Data;

        const res = await uploadToCloudinary(fileUri, file.name);

        return res.result.secure_url;
    } catch (error : any) {
        throw new Error(error);
    }
}