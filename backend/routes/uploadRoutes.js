const express = require("express");
const router = express.Router();
const {setUpload } = require("../controllers/uploadController")
const { protect } = require("../middleware/authMiddleWare");
require('dotenv').config();

const asyncHandler = require("express-async-handler");
const cors = require("cors");
const bodyParser = require('body-parser');

const { Storage } = require('@google-cloud/storage');
const multer = require("multer");
const  {initializeApp} = require("firebase/app");
const {File} = require("../models/fileModel");
const {User} = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');








// Create new storage instance with Firebase project credentials
const storage = new Storage({
    projectId: process.env.GCLOUD_PROJECT_ID,
    keyFilename: process.env.GCLOUD_APPLICATION_CREDENTIALS,
  });

  // Create a bucket associated to Firebase storage bucket
const bucket = storage.bucket(process.env.GCLOUD_STORAGE_BUCKET_URL);

// Initiating a memory storage engine to store files as Buffer objects


   
  
   
   


const uploader = multer({
   
    destination: function(req, file, cb) {
        // console.log(req.body)
        cb(null, "/frontend/public/file");
        //client/build/public
        },
    limits: {
      fileSize: 5 * 1024 * 1024, // limiting files size to 5 MB
    },
  }
  
  
  );
  const uuid = uuidv4();

  
  
 
router.post( "/", protect, uploader.single('fileName', uuid), async (req, res, next) => { 

   
try {
   
    if (!req.file) {
        res.status(400).send('Error, could not upload file');
        console.log(req.file);
        return;
      }



      // Create new blob in the bucket referencing the file
const blob = bucket.file(req.file.originalname);

// Create writable stream and specifying file mimetype

const blobWriter = blob.createWriteStream({
  metadata: {
    
    contentType: req.file.mimetype,
  },
});

blobWriter.on('error', (err) => next(err));

blobWriter.on('finish', () => {
  // Assembling public URL for accessing the file via HTTP
  const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
    bucket.name
  }/o/${encodeURI(blob.name)}?alt=media`;

  
  
    File.create({
      uploader: req.user.id,
      fileName: req.file.originalname,
      downloadLink: publicUrl
    }).then((file) => {
      })
  // Return the file name and its public URL
  res
    .status(200)
    .send({ fileName: req.file.originalname, fileLocation: publicUrl, blobNmae: blob.name });
});

// When there is no more data to be consumed from the stream
blobWriter.end(req.file.buffer);

} catch (error) {
    return res.status(400).send(error.message)
   
}



}


);


  
  
  
  

router.get("/", protect, async (req,res) => {

  File.find({uploader: req.user}).then((file) => {
      res.send(file);
  });
}
)



//router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);


module.exports =  router