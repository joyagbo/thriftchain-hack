const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors')
require('dotenv').config()
const waitlistRoute = require('./routes/waitListRoute');
const app = express()

app.use(cors())
//middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: false }));
//app.use(cookieParser());

//Api Health Checker
app.get("/api/healthchecker", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Welcome to Thrift Chain",
    });
});

//Database connection
const dbURI = process.env.MONGO_URI;
mongoose.connect(dbURI,)
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));

//waitlist router
app.use("/waitlist", waitlistRoute)

const port = 3000;
app.listen(port, () => {
    console.log(`server running on port ${port}`);
});
