const router = require("express").Router();
const mw = require("./commet-middleware");
const commetsModel = require("./commet-model");

router.get("/", async (req, res, next) => {
  try {
    const allCommets = await commetsModel.getAll();
    res.status(200).json(allCommets);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", mw.checkCommetId, async (req, res, next) => {
  const getId = await commetsModel.getCommetById(req.params.id);
  res.status(200).json(getId);
});

router.post("/", async (req, res, next) => {
  try {
    const newCommets = await commetsModel.create(req.body);
    res.status(201).json(newCommets);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", mw.checkCommetId, async (req, res, next) => {
  try {
    const updatedCommet = await commetsModel.updateById(
      req.params.id,
      req.body
    );
    res.json(updatedCommet);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", mw.checkCommetId, async (req, res, next) => {
  try {
    const deletedCommet = await commetsModel.deleteById(req.params.id);
    res.json({ message: "kullanıcı silindi" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
