const EXPIRES_IN = 60 * 60 * 1000; // 1 hours
const { Router } = require("express");
const router = Router();

router.get("/", async (req, res) => {
  res.end();
});
router.use("/users", require("./users"));

module.exports = router;
