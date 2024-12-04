import express from "express";
import TaskModel from "../models/Task.js";

const router = express.Router();

// Fetch tasks for the logged-in user
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskModel.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err.message });
  }
});

export default router;