const router = require("express").Router();
const ApiController = require("../controllers/ApiController");

router.post("/resetPassword", async (req, res) => {
  const { type, data } = req.body;
  if (type == "email") {
    ApiController.resetPasswordByEmail(req, res);
  }

  if (type == "phone") {
    console.log("Sending new password to mobile phone");
  }
});

router.get('/video-available', async (req, res) => {
  
})

module.exports = router;
