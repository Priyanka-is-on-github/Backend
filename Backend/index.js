 const express = require("express");
 const app = express();
const cors = require("cors")
const PORT = 1243;
 const router=require("./routes/user")

//middleware
 app.use(express.json())
 app.use(cors())

 app.use("api/v1/user",router);

 app.listen(PORT,()=>{
    console.log("app is running at Port number:",PORT);
 })
