const Category = require("../model/Category");
const elasticsearchClient = require('../elasticsearch');

const AddCategory = async (req, res) => {
    try {
      const addCategory = await Category.create(req.body);
      res.send({message:'category add successfully',category:addCategory});
    } catch (e) {
        console.log('err',e);
      res.status(400).send(e.message);
    }
  };

  const BulkAddCategory = async(req,res) => {
    try{
  
      const bulk_add_category = await Category.insertMany(req.body);
      res.send({status:200,success:true,message:'book update successfully',data:bulk_add_category})
    }
    catch(err){
      console.log('err',err);
    }
  }  
 
  module.exports = {AddCategory,BulkAddCategory};
