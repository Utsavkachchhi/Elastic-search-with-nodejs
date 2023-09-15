const {Router} = require('express')
const category = new Router();

const {AddCategory,BulkAddCategory} = require("../controllers/CategoryController");


category.post('/',AddCategory)
category.post('/bulkCategory',BulkAddCategory)

module.exports = category;
