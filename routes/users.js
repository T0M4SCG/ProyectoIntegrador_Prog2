let express = require("express")
let router = express.Router()
let data = require("../controllers/usersController")

router.get("/",data.index)
router.get("/edit",data.edit)
router.get("/register",data.formRegister)
router.post("/register",data.register)
router.get("/login",data.formLogin)
router.post("/login",data.login)
router.get("/profile/:id",data.profile)

module.exports = router;