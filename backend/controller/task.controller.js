import asyncHandler from "../utils/asyncHandler.js";
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {Task} from '../model/task.model.js';

const addTasks = asyncHandler(async(req, res) => {
    const userId = req.user._id;
    if(!userId){
        throw new ApiError(400, "User id is missing")
    }

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
    if(!userId){
        throw new ApiError(400, "User id is missing")
    }

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


const editTask = asyncHandler(async(req, res) => {
    const {taskId, task} = req.body;
    if(!task || !taskId){
        throw new ApiError(400, "All fields are mandatory")
    }

    const updatedTask = await Task.findByIdAndUpdate(taskId, {
        $set: {
                task
            }
        },
        {new: true}
    )

    return res
    .status(200)
    .json(new ApiResponse(200, updatedTask, "Task updated"))
})


const getTask = asyncHandler(async(req, res) => {
    const { taskId } = req.params;
    if(!taskId?.trim()){
        throw new ApiError(400, "Task id is missing")
    }

    const taskDetails = await Task.findById(taskId)
    if(!taskDetails){
        throw new ApiError(400, "Coudnt fetch task details")
    }

    //return response
    return res.status(201).json(
        new ApiResponse(200, taskDetails, "Task fetched successfully")
    )
})


const deleteTask = asyncHandler(async(req, res) => {
    const {taskId} = req.body
    if(!taskId?.trim()){
        throw new ApiError(400, "Task id is missing")
    }

    await Task.findByIdAndDelete(taskId)

     //return response
    return res.status(201).json(
        new ApiResponse(200, "", "Task deleted successfully")
    )
})


const updateStatus = asyncHandler(async(req, res) => {
    const {taskId} = req.body
    if(!taskId?.trim()){
        throw new ApiError(400, "Task id is missing")
    }

    const task = await Task.findById(taskId)
    if(!task){
        throw new ApiError(400, "Coudnt fetch task details")
    }

    task.status = "Completed"
    await task.save({validateBeforeSave: false})

    return res.status(200)
    .json(new ApiResponse(200, {}, "Task status changed successfully"))
})

export {addTasks, getMyTasks, editTask, getTask, deleteTask, updateStatus}