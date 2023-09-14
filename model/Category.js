const  mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearchClient = require('../elasticsearch');

const categorySchema = new mongoose.Schema({

    name: {type: String,es_indexed:true},
    category_image: {type:String,es_indexed:true}
});   

categorySchema.plugin(mongoosastic,{esClient:elasticsearchClient})


const Category = new mongoose.model("Category",categorySchema);


module.exports = Category;
