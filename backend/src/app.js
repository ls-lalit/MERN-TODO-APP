const express = require("express");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Todo API is running"
    });
});
app.use("/api/auth", authRoutes);

module.exports = app;