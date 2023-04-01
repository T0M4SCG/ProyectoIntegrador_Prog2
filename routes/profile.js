let express = require("express")
let router = express.Router()
let data = require("../controllers/profileController")

router.get("/",data.index)
router.get("/edit",data.edit)

module.exports = router;