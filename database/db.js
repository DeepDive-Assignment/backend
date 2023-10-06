const mongoose = require("mongoose");
require("dotenv").config();

// const url =
//   "mongodb+srv://kamal000rawat:" +
//   process.env.MONGODB_PASSWORD +
//   "@cluster0.igexlph.mongodb.net/task_management?retryWrites=true&w=majority";

const url = "mongodb://localhost:27017/task_management";

mongoose
  .connect(url)
  .then(() => {
    console.log("Connection established");
  })
  .catch((err) => console.log("Connection Failed", err));

module.exports = mongoose;
