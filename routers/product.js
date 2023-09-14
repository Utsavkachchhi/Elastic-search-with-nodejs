const {Router} = require('express')
const productRouter = new Router();

const {AddProduct,UpdateProduct,deleteProduct,BulkAddProduct} = require("../controllers/ProductController")


productRouter.post('/',AddProduct)
productRouter.put('/:id',UpdateProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.post('/bulkUpload',BulkAddProduct);

module.exports = productRouter;
