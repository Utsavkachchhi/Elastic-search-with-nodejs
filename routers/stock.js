const {Router} = require('express')
const stock = new Router();

const {AddStock,BulkAddStock} = require("../controllers/StockController")


stock.post('/',AddStock)
stock.post('/bulkStock',BulkAddStock)


module.exports = stock;
