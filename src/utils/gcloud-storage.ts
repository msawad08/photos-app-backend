import { GetSignedUrlConfig, Storage } from "@google-cloud/storage";
import path from "path";
const serviceKey = path.join(__dirname, '../../config/folkloric-drive-380919-1b18de3be78a.json');

let storage: Storage, bucketName: string;
export const initialiseGoogleStorage = function(){
  storage = new Storage({
    keyFilename: serviceKey,
    projectId: process.env.PROJECT_ID,
  }
  );
  
  bucketName = process.env.BUCKET_NAME ?? "";
}





export async function generateV4ReadSignedUrl(
  fileName = "test"
) {
  const path = `photos/${fileName}.png`
  // These options will allow temporary read access to the file
  const options: GetSignedUrlConfig = {
    version: "v4",
    action: "read",
    expires: Date.now() + 60 * 60 * 1000, // 60 minutes
  };

  // Get a v4 signed URL for reading the file
  const response = storage.bucket(bucketName).file(path).getSignedUrl(options)
  if(response){
    let [url] = (await response) as [string];
    return url;
  }

  return path;
}

//     // [END storage_generate_signed_url_v4]
//   }
