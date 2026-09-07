const Task=require("../models/Task");
const createTask = async (req,res) =>{
    try{
        const {title,description,duedate} = req.body;
        if(!title){
            return res.status(400).json({
                success: false,
                message: "Task title is required"
            });
        }

        const task=await Task.create({
            title,
            description,
            duedate,
            user: req.userId
        });
        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });
    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const getTasks= async (req,res) =>{
    try {
        const tasks=await Task.find({
            user : req.userId
        });
        res.status(200).json({
            success: true,
            data: tasks
        });
    }
    catch (error){

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const updateTask = async (req, res) => {
    try {
        const { title, description, dueDate, completed } = req.body;

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                title,
                description,
                dueDate,
                completed
            },
            {
                new :true,
                runValidators:true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.userId
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully"
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
const completeTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.userId
            },
            {
                completed: true
            },
            {
                new: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task marked as completed",
            data: task
        });
    } catch (error) {
        console.error("Complete task error:", error);

        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


module.exports= {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
    completeTask
};