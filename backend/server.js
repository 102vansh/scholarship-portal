const express = require("express");

const app = express();
const cors = require("cors");
const expressfileupload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const {errormiddleware} = require('./middleware/error')
require('./db/conn')
const userrouter = require('./routes/studentroute')
const applicationroute = require('./routes/apllicationrouter')
const scholarroute = require('./routes/scholarshiprouter')
const dotenv = require("dotenv");
const cookieparser = require('cookie-parser')
dotenv.config({
    path:"./config/.env"
});
const port = process.env.PORT;
app.get("/", (req, res) => {
  res.send("backend server is up and running");
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,

}));

app.use(expressfileupload({
    useTempFiles:true,
    tempFileDir:"/tmp/"
}))
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})
app.use(cookieparser())
app.use('/api/v1/user',userrouter)
app.use('/api/v1/application',applicationroute)
app.use('/api/v1/scholarship',scholarroute)
app.use(errormiddleware)
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})