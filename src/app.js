const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const app = express();
var cors = require('cors')
const apiRouter = require("./route");
const errorHandler = require("./middleware/errorHandler");
require('dotenv').config()


mongoose.set("strictQuery", false);

mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTER}.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    console.log("Successfull connect to database");
}).catch( err => console.log(err))

app.use(cors());
app.use(bodyParser.json());
app.use("/api/v1",apiRouter);
app.use(errorHandler);

app.listen(`${process.env.PORT}`, function(){
    console.log("server launch");
})