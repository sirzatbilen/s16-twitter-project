const db = require("../../data/db-config");

const checkCommetId = async (req, res, next) => {
  try {
    const comment_id = req.params.id;
    const isExistValid = await db("comments").where({ comment_id }).first();
    if (!isExistValid) {
      res.status(404).json({ message: "id bulunamadı" });
    } else {
      next();
    }
  } catch (error) {
    next();
  }
};

module.exports = { checkCommetId };
