const router = require("express").Router();
const userModel = require("./users-model");
const userMW = require("./users-middleware");

router.get("/", async (req, res, next) => {
  const allUsers = await userModel.getAll();
  res.status(200).json(allUsers);
});

router.get("/:id", userMW.checkUserId, async (req, res, next) => {
  try {
    const getId = await userModel.getById(req.params.id);
    res.status(200).json(getId);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", userMW.checkUserId, async (req, res, next) => {
  try {
    const updatedUser = await userModel.updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", userMW.checkUserId, async (req, res, next) => {
  try {
    const deletedUser = await userModel.deleteById(req.params.id);
    res.json({ message: "kullanıcı silindi" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
