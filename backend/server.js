const express = require('express');
const colors = require("colors");
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const cors = require("cors");
const { errorHandler } = require("./middleware/errorMiddleWare");
const connectDB = require("./config/db");

const port = process.env.PORT || 5000






connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors());

app.use("/api/file", require("./routes/fileRoutes"));
app.use("/api/users", require("./routes/userRoutes"));

app.use(errorHandler)

app.listen(port, () => console.log(`Server has started on ${port}`))