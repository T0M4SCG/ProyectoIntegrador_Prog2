let express = require("express")
let router = express.Router()
let data = require("../controllers/usersController")

router.get("/",data.index)
router.get("/profile/formEdit",data.formEdit)
router.post("/profile/edit",data.edit)
router.get("/register",data.formRegister)
router.post("/register",data.register)
router.get("/login",data.formLogin)
router.post("/login",data.login)
router.get("/profile/:id",data.profile)
router.get("/results",data.results)


module.exports = router;