const userModel = require("../users/users-model");
const bcrypt = require("bcryptjs");

const payloadCheck = async function (req, res, next) {
  try {
    const { name, surname, email, password } = req.body;

    if (!name || !surname || !email || !password) {
      res.status(400).json({ message: "Eksik alan var" });
    } else {
      req.inPassword = await bcrypt.hash(req.body.password, 8);
      next();
    }
  } catch (error) {
    next(error);
  }
};

const emailUnique = async function (req, res, next) {
  try {
    let isExistUser = await userModel.getByFilter({ email: req.body.email });
    if (isExistUser) {
      res.status(401).json({ message: "Bu email ile kayıtlı kullanıcı var" });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};
const passwordCheck = async function (req, res, next) {
  try {
    let email = await userModel.getByFilter({ email: req.body.email });
    if (!email || !req.body.password) {
      res.status(401).json({ message: "Geçersiz kriterler" });
    } else {
      const { password } = req.body;
      let isTruePassword = bcrypt.compareSync(password, email.password);
      if (!isTruePassword) {
        res.status(401).json({ message: "Geçersiz kriterler" });
      } else {
        req.user = email;
        next();
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { payloadCheck, emailUnique, passwordCheck };
