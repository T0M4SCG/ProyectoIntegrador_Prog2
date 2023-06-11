let express = require("express")
let router = express.Router()
let product = require("../controllers/productController")

router.get('/', product.products);
router.get("/detalle/:id",product.detalle);
router.post("/borrar",product.borrar);
router.post("/editForm",product.productEditForm);
router.post("/edit",product.productEdit);
router.get("/cargar",product.formAdd);
router.post("/cargar",product.add)
router.get("/results",product.results)
router.post("/addComment",product.addComment)

module.exports = router;