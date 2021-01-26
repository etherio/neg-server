const { guard } = require("../middleware/guard");
const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.get("/", guard(["admin"]), UserController.index);

router.post("/", UserController.register);

module.exports = router;
