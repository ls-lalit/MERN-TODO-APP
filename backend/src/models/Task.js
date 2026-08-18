const mongoose = require("mongoose");
const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Task title is required"],
            trim: true,
            minlength: [1, "Task title cannot be empty"],
            maxlength: [100, "Task title cannot exceed 100 characters"]
        },

        description: {
            type: String,
            trim: true,
            maxlength: [500, "Description cannot exceed 500 characters"]
        },

        completed: {
            type: Boolean,
            default: false
        },

        dueDate: {
            type: Date
        },

        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: [true, "Task owner is required"]
        }
    },
    {
        timestamps: true
    }
);
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
