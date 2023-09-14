const {Router} = require('express')
const category = new Router();

const {AddCategory} = require("../controllers/CategoryController");


category.post('/',AddCategory)

module.exports = category;
