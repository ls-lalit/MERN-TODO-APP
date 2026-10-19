const Task = require("../models/Task");

const createTask = async (taskData) => {
    return await Task.create(taskData);
};


const getTasks = async (userId) => {
    return await Task.find({
        user: userId
    });
};


const getTaskById = async (taskId, userId) => {
    return await Task.findOne({
        _id: taskId,
        user: userId
    });
};


const updateTask = async (taskId, userId, updateData) => {
    return await Task.findOneAndUpdate(
        {
            _id: taskId,
            user: userId
        },
        updateData,
        {
            new: true,
            runValidators: true
        }
    );
};


const deleteTask = async (taskId, userId) => {
    return await Task.findOneAndDelete({
        _id: taskId,
        user: userId
    });
};


const completeTask = async (taskId, userId) => {
    return await Task.findOneAndUpdate(
        {
            _id: taskId,
            user: userId
        },
        {
            completed: true
        },
        {
            new: true
        }
    );
};


module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    completeTask
};