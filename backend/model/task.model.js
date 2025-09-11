import mongoose, {Schema} from "mongoose";

const taskSchema = new Schema({
    task: {
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    status: {
        type: String,
        required: true
    },
    completedAt: {
        type: Date,
        required: true
    }
}, {timestamps: true})

export const Task = mongoose.model("Task", taskSchema)