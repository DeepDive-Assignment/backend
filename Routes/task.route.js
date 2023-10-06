const taskController = require("../Controllers/task.controller");

const router = require("express").Router();

router.get("/gettaskList", taskController.get);
router.post("/addtask", taskController.post);
router.post("/updatetask/:id", taskController.update);
router.get("/singletask/:id", taskController.getsingletask);
router.delete("/deletetask/:id", taskController.delete);
module.exports = router;
