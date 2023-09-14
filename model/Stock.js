const  mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearchClient = require('../elasticsearch');

const stockSchema = new mongoose.Schema({

    name: {type: String,es_indexed:true},
    price: {type : Number,es_indexed:true},
    description: {type : String,es_indexed:true},
    category: {type: String,es_indexed:true},
    image: {type : String,es_indexed:true},

});   

stockSchema.plugin(mongoosastic,{esClient:elasticsearchClient})


const Stock = new mongoose.model("Stock",stockSchema);


module.exports = Stock;
