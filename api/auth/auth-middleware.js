const db = require("./../../data/dbConfig");
const jwt = require("jsonwebtoken");
const model = require("./auth-model");

const validateRegistration = async (req, res, next) => {
  //const { username, password } = req.body;
  const username = req.body.username;
  const result = await model.getBy({ username }).first();
  if (!username || !req.body.password) {
    res.status(401).json({ message: "username and password required" });
  } else if (result) {
    res.status(401).json({ message: "username taken" });
  } else {
    next();
  }
};

const validateLogin = async (req, res, next) => {
  //const { username, password } = req.body;
  const { username, password } = req.body;
  //   const name = await model.getBy({ username: username });
  //   const code = await model.getBy({ password: password });
  if (!username || !password) {
    res.status(401).json({ message: "username and password required" });
  }
  //   else if (!name || !code) {
  //     res.status(401).json({ message: "invalid credentials" });
  //   }
  else {
    next();
  }
};

module.exports = {
  validateRegistration,
  validateLogin,
};
