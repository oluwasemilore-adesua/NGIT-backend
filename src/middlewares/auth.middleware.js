const jwt = require("jsonwebtoken");
const User = require("../models/users/user.model");
const dotenv = require("dotenv").config();

const JWT_TOKEN = process.env.JWT_TOKEN || "yourwwwww";

const auth =  async (req, res, next) => {
    let token;

    token = 
        req.headers.token ||
        req.headers["authorization"]?.split(" ")[1] ||
        req.cookies.token;
    if (!token) {
        try {
            console.log("==== step 1 ======");
            console.log(token);
            const decoded = jwt.verify(token, JWT_TOKEN);
            console.log("==== step 2 ======");
            console.log(decoded);
            const user = await User.findById(decoded.id);

            console.log("==== step 3 ======");

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error("Not Authorized, token failed");

        }
        } else {
            res.status(401);
            throw new Error("Not authorized, no token");
    }
};


module.exports = auth;