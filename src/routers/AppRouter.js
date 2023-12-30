const router = require("express").Router();
const AppController = require('../controllers/AppController')

// main router
router.get("/", (req, res) => {
  AppController.show(req, res);
});


router.get("/index", (req, res) => {
  AppController.show(req, res);
});

module.exports = router;
