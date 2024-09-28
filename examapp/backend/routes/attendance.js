const router=require('express').Router()
require('dotenv').config()


router.post("/sendphoto",async(req,res)=>{
  
    let image=req.body.url;
     // Remove the Base64 prefix (if present)
     const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    
     // Convert Base64 string to Buffer
     const buffer = Buffer.from(base64Data, 'base64');
   // Configure AWS SDK
   const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
   // Create an S3 client
const s3Client = new S3Client({
  region: process.env.REGION,  // Set your region here
  credentials: {
      accessKeyId:  process.env.ACCESS_KEY_ID,   // Store credentials in environment variables
      secretAccessKey: process.env.SECRET_ACCESS_KEY
  }
});
   


  

  const params = {
    Bucket: "schools-management-system-bucket",
    Key: `webcams/${Date.now()}.jpg`, // unique name for the image
    Body: buffer,
    ContentType: 'image/jpeg', // specify content type
    Metadata:{
      fullname:"tushar kumar gupta"
    }
  };

  try {
    // Upload file to S3
    const data = await s3Client.send(new PutObjectCommand(params));
   
  } catch (error) {
    console.log(error)
  }
    
})
module.exports=router