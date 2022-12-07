const router = require("express").Router();
const controller = require("./controller/controller");

router.post("/save", controller.add);
router.get("/get", controller.findAll);
router.get("/find", controller.pagination);
router.delete("/remove", controller.remove);
module.exports = router;
