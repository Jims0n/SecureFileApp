


//const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");

//const {firebaseConfig} = require("../config/firebaseConfig")










/*
//Initialize a firebase application

initializeApp(firebaseConfig);

//Initialize Cloud Storage and get a referencr to the service
const storage = getStorage();

//Setting up multer as middleware to grab the uploads
const upload = multer({storage: multer.memoryStorage()});


const setUpload =    (upload.single("filename"), (async (req, res) => {
       try {
        const dateTime = giveCurrentDateTime();
            console.log(req.file);
        const storageRef = ref(storage, `files/${req.file.originalname + "      " + dateTime}`);

        //Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        //Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata)
        //by usig uploadBytesResumeable we can control the progress of uploading

        //Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log("File successfully uploaded.");
        return res.send({
            message: "file uploaded to firebase storage",
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })

       } catch (error) {
        return res.status(400).send(error.message)
       }



    
})
);


const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDay();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime
}

module.exports = {
  setUpload
} 



/*
// @desc  Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id})

    res.status(200).json(goals)
})


// @desc  Set goals
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please add a text field")
    }
    const goal = await Goal.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(goal)
})


// @desc  Update goals
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }



    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user mathches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updatedGoal)
})


// @desc  Delete goals
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id)

    if(!goal) {
        res.status(400)
        throw new Error("Goal not found")
    }

    

    // Check for user
    if(!req.user) {
        res.status(401)
        throw new Error("User not found")
    }

    // Make sure the logged in user mathches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error("User not authorized")
    }

    await goal.remove()


    res.status(200).json({ id: req.params.id })
})


module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal
}
*/