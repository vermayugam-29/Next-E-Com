//do i really need this profile route when i already added additionalDetails in token ??????

// import dbConnect from "@/lib/dbConnect";
// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// export async function GET(req : NextRequest) {
//     await dbConnect();

//     try {
//         const token = await getToken({req});
//         const additionalDetails = 
//     } catch (err : any) {
//         return NextResponse.json({
//             success : false,
//             message : 'Something went wrong while fetching user details',
//             error : err.message
//         } , {
//             status : 500
//         })
//     }
// }