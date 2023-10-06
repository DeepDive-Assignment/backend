const taskModel = require("../Models/task.model");

module.exports = {
  get: async (req, res, next) => {
    try {
      let { page } = req.query;
      const pageLimit = 3;
      page -= 1;
      let total = await taskModel.find({}).exec();
      taskModel
        .aggregate([
          {
            $sort: {
              createdAt: -1,
            },
          },
          { $skip: page * pageLimit },
          {
            $limit: pageLimit,
          },
        ])
        .then((task) => {
          console.log(task.length, Math.round(task.length / 2));
          if (task.length > 0) {
            res.status(200).json({
              status: "fetch task successfully",
              data: task,
              totalCount: total.length,
              totalPages:
                Math.floor(total.length / pageLimit) +
                (total.length % pageLimit > 0 ? 1 : 0),
            });
          } else {
            res.status(204).json({ status: "No task", data: task });
          }
        })
        .catch(function (err) {
          res.status(400).json({ status: "Bad Request Error" });
        });
    } catch (err) {
      res.status(500).json({ status: "Internal Server Error" });
    }
  },
  getsingletask: (req, res) => {
    try {
      const { id } = req.params;
      taskModel
        .findOne({ _id: id })
        .then((task) => {
          if (task) {
            res
              .status(200)
              .json({ status: "fetch task successfully", data: task });
          } else {
            res.status(404).json({ status: "No task", data: task });
          }
        })
        .catch(function (err) {
          res.status(406).json({ status: "Something went wrong" });
        });
    } catch (error) {
      res.status(500).json({ status: "Internal Server Error" });
    }
  },
  post: async (req, res) => {
    try {
      const newTask = await new taskModel(req.body);
      newTask
        .save()
        .then((result) => {
          res
            .status(201)
            .json({ status: "Task Created Successful", data: result });
        })
        .catch((err) => {
          res.status(500).json({ status: "Task Failed", data: data });
        });
    } catch (error) {
      res.status(500).json({ status: "Internal Server Error" });
    }
  },
  update: (req, res) => {
    try {
      const { id } = req.params;
      taskModel
        .findByIdAndUpdate(id, req.body)
        .then((result) => {
          res.status(200).json({ status: "Task Updated Successful" });
        })
        .catch((err) => {
          res.status(500);
        });
    } catch (error) {
      res.status(500).json({ status: "Internal Server Error" });
    }
  },
  delete: (req, res) => {
    try {
      const { id } = req.params;
      taskModel
        .findByIdAndRemove(id)
        .then((result) => {
          res.status(200).json({ status: "Task Deleted Successful" });
        })
        .catch((err) => {
          res.status(500);
        });
    } catch (error) {
      res.status(500).json({ status: "Internal Server Error" });
    }
  },
};
