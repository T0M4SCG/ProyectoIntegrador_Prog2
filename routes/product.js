let express = require("express")
let router = express.Router()
let product = require("../controllers/productController")

router.get('/', product.products);
router.get("/detalle/:id",product.detalle)

module.exports = router;