const router = require("express").Router();
const AppController = require("../controllers/AppController");

// main router
router.get("/", (req, res) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  AppController.show(req, res);
});

router.get("/index", (req, res) => {
  res.header("Cache-Control", "no-cache, no-store, must-revalidate");
  res.header("Pragma", "no-cache");
  res.header("Expires", 0);
  AppController.show(req, res);
});

module.exports = router;
