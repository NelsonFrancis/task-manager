import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {User} from '../model/user.model.js';


const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
        
    } catch (error) {
        throw new ApiError(500, "Something went wrong while creating access token and refresh token");
    }
}


const registerUser = asyncHandler(async (req, res) => {
    //extract variables from request body
    const {email, fullName, password} = req.body

    //checking for empty fileds
    if(
        [email, fullName, password].some(field => field?.trim === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //checking for existing user
    const existingUser = await User.findOne({email})
    if(existingUser){
        throw new ApiError(409, "User with email or username already exist")
    }

    //save user
    const user = await User.create({
        email, 
        fullName, 
        password
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    if(!createdUser){
        throw new ApiError(500, "Someting went wrong while creating user")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
})



const loginUser = asyncHandler(async (req, res) => {
    //extract values from req body
    const {email, password} = req.body;
    if(!email){
        throw new ApiError(400, "Email id is required")
    }
    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(404, "User not found")
    }

    //check for valid password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if(!isPasswordValid){
        throw new ApiError(401, "Password incorrect")
    }

    //set accesstoken and refreshtoken
    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUser, accessToken, refreshToken
            },
            "User logged in successfully"
        )
    )

})


export {registerUser, loginUser}