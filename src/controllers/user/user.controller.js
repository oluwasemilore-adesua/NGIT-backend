const bcrypt = require("bcryptjs");
const User = require("../../models/users/user.model");

const saltRounds = 10;

const getUser = async (req,res) =>{
    try{
        const users = await User.find();
        res.json(users);
    }catch(error){
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "An error occurred while fetching users"});
    }
    };
    

const getUserById = async (req,res) =>{
    try{
        const id = req.params.id;
        
        if (!id){
            res.status(400).json({error: "User ID is required"});  
            return;
        }
        const user = await User.findById(id);
        if (!user){
            res.status(404).json({error: "User not found"});
            return;
        } else{
            res.json(user);
        }
    }catch(error){
        console.error("Error fetching user by ID:", error);
        res
        .status(500)
        .json({error: "An error occurred while fetching the user"});
    }
    };


const createUser = async (req,res) =>{
    try{
        const {name, email, age, password} = req.body;
        if(age <0 || age> 120){
            res.status(400).json({error: "Age must be between 0 and 120"});
            return;
        }

        if (password<6){
            res
            .status(400)
            .json({error: "Password must be at least 6 characters long"});
            return;
        }
        console.log("password before hashing:", password);

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log("hashed password", hashedPassword)

        const userEmailExist = await User.findOne({email});
        if(userEmailExist){
            res.status(400).json({error: "Email already exists"});
            return;
        }
        const newUser = new User({name, email, age, password : hashedPassword});
        await newUser.save();
        res.status(201).json(newUser);
    }catch(error){
        console.error("Error creating user:", error);
        res
        .status(500)
        .json({error: "An error occured while creating the user"});
    }
};

const updateUser = async (req, res) => {
    try{
        const id = req.params.id;
        
        if (!id){
            res.status(400).json({error: "User ID is required"});
            return;
        }
        const user = await User.findOneAndUpdate({_id: id}, req.body, {
            new: true
        });
        
         return res.json(user); 
      } catch(error){
        console.error("Error updating user:", error);
        res
        .status(500)
        .json({error: "An error occured while updating the user"});
      }
};

const deleteUser = async (req, res) => {
    try{
        const id = req.params.id;

        if (!id){
            res.status(400).json({error: "User ID is required"});
            return;
        }

        const deleteUser = await User.findByIdAndDelete(id);

        if (!deleteUser){
            res.status(404).json({error: "User not found"});
            return;
        } else{
            res.json({message: "User deleted successfully"});
        }
    } catch(error){
        console.error("Error deleting user:", error);
        res.status(500).json({error: "An error occurred while deleting the user"});
    }
};

module.exports ={
    getUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};