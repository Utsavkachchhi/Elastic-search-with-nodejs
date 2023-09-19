const Review = require("../model/Review");
const elasticsearchClient = require('../elasticsearch');


const BulkAddReview = async(req,res) => {
  try{

    const bulk_add_review = await Review.insertMany(req.body);
    res.send({status:200,success:true,message:'review update successfully',data:bulk_add_review})
  }
  catch(err){
    console.log('err',err);
  }
} 


  module.exports = { BulkAddReview};
