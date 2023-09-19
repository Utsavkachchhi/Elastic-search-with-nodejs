const  mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearchClient = require('../elasticsearch');

const reviewSchema = new mongoose.Schema({

      rating: {
        type : Number,
        es_indexed:true
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        es_indexed:true
      },
      review_title : {
         type : String,
         es_indexed:true 
      },
      review: {
        type : String,
        es_indexed:true
      },
  
      // customer: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   required : [true, 'Customer is Required'],
      //   ref: "Customer",
      //   es_indexed:true
      // },
  
      is_deleted: {
          type:Number,
          min:0,
          max:1,
          default:0,
          es_indexed:true
      },
});   

reviewSchema.plugin(mongoosastic,{esClient:elasticsearchClient})


const Review = new mongoose.model("Review",reviewSchema);


module.exports = Review;
