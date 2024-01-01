const router = require("express").Router();
const ApiController = require("../controllers/ApiController");

router.post("/resetPassword", async (req, res) => {
    const type = req.params.type;
    const option = {};
    if (type == 'email') {
        option['where'] = {
            email: data,
        }
        ApiController.resetPasswordByEmail(req, res);
    } 
    
    if (type == 'phone') {
        option['where'] = {
            username: data,
        }
    }
});

module.exports = router;
