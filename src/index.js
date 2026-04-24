 const express = require("express");
 const userRouter = require("./routes/users/user.route");
 const dotenv = require("dotenv");
 const connectDB = require("./db");
const errorHandler = require("./middlewares/error");
 dotenv.config();



 const PORT = process.env.PORT || 3000;
 console.log(PORT);


 const app = express();

 //middleware
 app.use (express.json());
 app.use (express.urlencoded({ extended: true}));

 //routes
 app.use("/api/users", userRouter);
 
 app.get("/test-400", (req,res, next) =>{
  const err = new Error("Bad Request");
  err.statusCode = 400;
  next(err);
 });

 app.get("/test-500", (req, res, next) => {
  console.log(req.headers);
  return res.send("Test 500");
});

  app.use(errorHandler);


 app.listen(PORT, async () =>{
   await connectDB();
   console.log(`Server is running on port ${PORT}`);
 });