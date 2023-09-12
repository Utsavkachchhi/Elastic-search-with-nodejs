const {Router} = require('express')
const productRouter = new Router();

const {AddProduct,UpdateProduct,deleteProduct} = require("../controllers/ProductController")


productRouter.post('/',AddProduct)
productRouter.put('/:id',UpdateProduct);
productRouter.delete('/:id',deleteProduct);

module.exports = productRouter;
