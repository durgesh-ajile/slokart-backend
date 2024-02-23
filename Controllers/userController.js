import userModel from "../Models/LoginModels.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const registerController = async (req, res) => {
    try {const {userName, email, password} = req.body;
    if (!userName || !email || !password){
        res.status(422).json({message : "All fields are mandatory"})
    }
    const notUnique = await userModel.findOne({email : email})
    if (notUnique){
        res.status(422).json({message : "Email already exist"})
    }

    const encryptPass = await bcrypt.hash(password, 10)
    const newUser = new userModel({
        userName,
        email,
        password : encryptPass
    })
    const createdUser = await newUser.save()

    res.status(201).json({status: true, message: `Successfully registered with mail ${createdUser.email}`})}
    catch (err) {
        console.log(err)
    }
}

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            res.status(422).json({message: "Email and password are required"})
        }

        const user = await userModel.findOne({email: email})
        if(!user){
            res.status(404).json({message: "No user with such email"})
        }

        console.log()
        const compare = await bcrypt.compare(password, user.password)
        if(!compare){
            res.status(401).json({message: "Incorrect email or password"})
        }

        const currentDate = new Date();
        const expiryDate = currentDate.getDate() + 1;

        const payload = {
            id : user._id,
            email: email
        }
        const token = await jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 86400
        })
        res.status(201).json({status: true, message: "Successfully logged in", token: {
            userToken: token,
            expiryDate: expiryDate
        } })
    } catch (err){
        res.status(500).json({status: false, message: "Something went wrong"})
    }
}


export {registerController, loginController}