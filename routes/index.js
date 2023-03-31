var express = require('express');
var router = express.Router();
let controller = require("../controllers/mainController")

/* GET home page. */
router.get("/",controller.index)
router.get("/register",controller.register)
router.get("/login",controller.login)

module.exports = router;
