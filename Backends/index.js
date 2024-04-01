 const express = require("express");
 const app = express();
const cors = require("cors")
const PORT = 1243;
 require("./routes/authroutes")

//middleware
 app.use(express.json())
 app.use(cors())

//  app.use("api/v1",router);

 app.listen(PORT,()=>{
    console.log("app is running at Port number:",PORT);
 })
