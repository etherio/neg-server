const User = require("../models/User");

class UserController {
  static index(req, res) {
    User.all(req.auth.uid).then((users) => res.json(users));
  }

  static register(req, res) {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch((err) => {
        res.status(err.status || 500).json({
          status,
          code: err.code || "auth/internal",
          error: err.message,
        });
      });
  }
}

module.exports = UserController;
