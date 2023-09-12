const Book = require("../model/Book");
const User = require("../model/User");
const elasticsearchClient = require('../elasticsearch');
const { default: mongoose } = require("mongoose");

//Add Book
const AddBook = async(req,res) => {

    try{
      //  console.log(req.body);
       
       const book = await Book.create(req.body);
       const addbook = await book.save(); 
       
       // Index the book in Elasticsearch
       await indexBookInElasticsearch(book);

       res.status(201).send(addbook);

    }catch(e) {
           res.status(400).send(e.message);
    }
}

//Get book with user data
const GetBook = async (req,res) => {
    try{
        const getbook = await User.find().populate('Book');

        res.send(getbook);
        }catch(e) {
      res.status(400).send(e.message);
    }
 }

 //Get all book
 const AllBook = async(req,res) => {
  try{
    const getbook = await Book.find();

    const book_data = await elasticsearchClient.search({
      index: 'books', // Replace with your Elasticsearch index name
      body : {
      query: {
        match_all: {}
      },
      // profile: true
    },
    });
    
    // Query data from Elasticsearch
    if (book_data.hits && book_data.hits.hits) {
      const elasticsearchResults = book_data.hits.hits.map((hit) => hit._source);
      res.send({Book:elasticsearchResults});

    }
    else{
      res.send({message:'no books found!'});
    }
  }
  catch(err){
    console.log('err',err);
  }
 }

 //Get book with id
 const GetBookById = async(req,res) => {
   try{
    let bookId = req.params.id;

    const getbook = await Book.find({_id:mongoose.Types.ObjectId(bookId)});
    
    const getElastic_result = await elasticsearchClient.get({
      index: 'books', // Your Elasticsearch index name
      id: bookId,
    });

    // Check if the document was found
    if (getElastic_result.found == true) {
      const bookFromElasticsearch = getElastic_result?._source;
      res.send({ Book: bookFromElasticsearch });
    } else {
      res.status(404).send({ error: 'Book not found' });
    }
   }
   catch(error){
    console.log('err',error);
   }
 }

 //Update book with id
 const UpdateBookById = async(req,res) => {
  try{
    const bookId = req.params.id;

    const updateBook = await Book.findByIdAndUpdate(bookId,req.body);
    const doc = {};
    
    for (const key in req.body) {
      doc[key] = req.body[key];
    }
   
    const elasticsearch_update = await elasticsearchClient.update({
      index : "books",
      id: bookId,
      body : {
        doc
      }
    })
    res.send({message:'book updated successfully',Book:elasticsearch_update})
    
  }
  catch(error){
    console.log('err',error);
  }
 }

 //Delete book with id
 const DeleteBookById = async(req,res) => {
  try{
     const bookId = req.params.id;

     const deleteBook = await Book.findByIdAndDelete(bookId);

     if (!deleteBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    const deleteResponse = await elasticsearchClient.delete({
      index: 'books', // Replace with your Elasticsearch index name
      id: bookId
    });

    console.log('deleteResponse', deleteResponse);

    res.status(200).json({ message: 'Book deleted successfully' });
  }
  catch(err){
    console.log('err',err);
  }
 }


 

 // Function to index a book in Elasticsearch
 async function indexBookInElasticsearch(book) {
  try {
    const result =  await elasticsearchClient.index({
      index: 'books', // Your Elasticsearch index name
      id: book._id.toString(),
      body: {
        title: book.title,
        author: book.author,
        published_date: book.published_date,
        isbn: book.isbn,
      },
    });
    console.log('Indexed book in Elasticsearch:', result);

  } catch (error) {
    console.error('Error indexing book in Elasticsearch:', error);
  }
}




module.exports = {AddBook,GetBook,AllBook,GetBookById,UpdateBookById,DeleteBookById};