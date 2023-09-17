const {Router} = require('express')
const productRouter = new Router();

const {AddProduct,UpdateProduct,deleteProduct,BulkAddProduct,GetProduct,GetProductSuggestion,GetProductSuggestionResult} = require("../controllers/ProductController")


productRouter.post('/',AddProduct)
productRouter.put('/:id',UpdateProduct);
productRouter.delete('/:id',deleteProduct);
productRouter.post('/bulkUpload',BulkAddProduct);
productRouter.get('/',GetProduct);
productRouter.get('/search',GetProductSuggestion);
productRouter.get('/search/:id',GetProductSuggestionResult);

module.exports = productRouter;
