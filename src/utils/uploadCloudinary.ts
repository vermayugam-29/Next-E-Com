import { cloudinary } from '@/lib/cloudinaryConnect';


export const uploadToCloudinary = (
  fileUri: string, fileName: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fileUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: process.env.FOLDER_NAME,
        use_filename: true,
      })
      .then((result) => {
        resolve({
            success: true,
            message : 'Uploaded to cloudinary successfully' , 
            datta : result
        });
      })
      .catch((error) => {
        reject({ 
            success: false,
            message : 'Something went wrong while uploading file to cloudinary',
            error : error 
            });
      });
  });
};


/*
frontend code
const uploadStagedFile = async (stagedFile: File | Blob) => {
  const form = new FormData();
  form.set("file", stagedFile);

  // here /api/upload is the route of my handler
  const res = await fetch("/api/upload", {
        method: "POST",
        body: form,
        headers: {
          // add token
          // content-type will be auto-handled and set to multipart/form-data
        },
   });

  const data = await res.json();

  // we will return the uploaded image URL from the API to the client
  console.log(data.imgUrl);
}
*/