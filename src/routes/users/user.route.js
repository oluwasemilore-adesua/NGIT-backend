const express = require(`express`);
//const userController = require("../../controllers/user/user.controller");
const{
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser

} =require("../../controllers/user/user.controller");

const userRouter = express.Router();


userRouter.get("/", getUser);

userRouter.get("/:id", getUserById);

userRouter.post("/", createUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);


module.exports = userRouter;