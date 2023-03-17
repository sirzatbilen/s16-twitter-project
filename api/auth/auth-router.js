const router = require("express").Router();
const mw = require("./auth-middleware");
const userModel = require("../users/users-model");
const utils = require("../secret/utils");

router.post(
  "/register",
  mw.payloadCheck,
  mw.emailUnique,
  async (req, res, next) => {
    try {
      const newUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.inPassword,
      };
      const insertedUser = await userModel.create(newUser);
      res.status(201).json(insertedUser);
    } catch (error) {
      next();
    }
  }
);

router.post("/login", mw.passwordCheck, async (req, res, next) => {
  try {
    const payload = {
      user_id: req.user.user_id,
    };
    let token = utils.generateToken(payload, "1d");
    res.status(200).json({ message: `Welcome ${req.user.name}`, token });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
