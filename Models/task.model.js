const mongoose = require("mongoose");

const taskListSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    dueDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("task_list", taskListSchema);
