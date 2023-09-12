const  mongoose = require('mongoose');
const mongoosastic = require('mongoose-elasticsearch-xp');
const elasticsearchClient = require('../elasticsearch');

const bookSchema = new mongoose.Schema({

    title : {
        type : String,
        required : true
    },

    author : {
        type : String,
        required : true
    },

    published_date : {
        type: Date,
        required : true,
        default : Date.now
    },

    isbn : {
        type : String,
        required : true
    },


     

})




const Book = new mongoose.model("Book",bookSchema);
module.exports = Book;