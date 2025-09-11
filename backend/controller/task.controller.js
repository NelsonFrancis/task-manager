import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Task} from '../model/task.model.js';

const addTasks = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    const {task, createdBy, status, completedAt} = req.body

     //checking for empty fileds
    if(
        [task, createdBy, status, completedAt].some(field => field?.trim === "")
    ){
        throw new ApiError(400, "All fields are required")
    }

    //save task
    const addedTask = await Task.create({
        task, 
        createdBy: userId, 
        status,
        completedAt,
    })
    if(!addedTask){
        throw new ApiError(500, "Someting went wrong while creating task")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200, addedTask, "Task created successfully")
    )
})


const getMyTasks = asyncHandler(async(req, res) => {
    const userId = req.user._id;

    // Find all tasks belonging to that user
    const tasks = await Task.find({ createdBy: userId }).sort({ createdAt: -1 });
    if(!tasks){
        throw new ApiError(400, "Tasks not fetched")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200, tasks, "User tasks fetched successfully")
    )
})

export {addTasks, getMyTasks}