const {Router} = require('express')
const bookRouter = new Router();

const {AddBook,GetBook,AllBook,GetBookById,UpdateBookById,DeleteBookById} = require("../controllers/BookController.js")


bookRouter.post('/',AddBook)
bookRouter.get('/',GetBook)
bookRouter.get('/allBook',AllBook)
bookRouter.get('/:id',GetBookById);
bookRouter.put('/:id',UpdateBookById);
bookRouter.delete('/:id',DeleteBookById)

module.exports = bookRouter;
