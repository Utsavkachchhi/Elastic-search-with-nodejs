const {Router} = require('express')
const productRouter = new Router();

const {AddProduct,UpdateProduct,deleteProduct,BulkAddProduct,GetProduct} = require("../controllers/ProductController")


productRouter.post('/',AddProduct)
productRouter.put('/:id',UpdateProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.post('/bulkUpload',BulkAddProduct);
productRouter.get('/',GetProduct)

module.exports = productRouter;
