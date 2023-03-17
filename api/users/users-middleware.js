const db = require("../../data/db-config");

const checkUserId = async (req, res, next) => {
  try {
    const user_id = req.params.id;
    const isExist = await db("users").where({ user_id }).first();
    if (!isExist) {
      res.status(404).json({ message: "kullanıcı bulunamadı." });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { checkUserId };
