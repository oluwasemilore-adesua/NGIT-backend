 const express = require("express");
 const userRouter = require("./routes/users/user.route");
 const dotenv = require("dotenv");
 const connectDB = require("./db");
 dotenv.config();



 const PORT = process.env.PORT || 3000;
 console.log(PORT);


 const app = express();

 //middleware
 app.use (express.json());
 app.use (express.urlencoded({ extended: true}));


 //routes
 app.use("/api/users", userRouter);
 



 app.listen(PORT, async () =>{
   await connectDB();
   console.log(`Server is running on port ${PORT}`);
 });