import { asyncHandler } from "../utils/AsyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const registerUser = asyncHandler( async (req, res) => {
    const {fullname, email, username, password} = req.body
    console.log("email: ", email);


    //checking if any field is empty or not if empty throw error to the ApiError error handling file
    if(
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //checking if the user is already registered or not.
    const existedUser = await User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser){
        throw new ApiError(409, "User with this email or username already exists")
    }


    // change the user.routes.js using reference and then add the localpath from middleware .files method


})

export { registerUser }