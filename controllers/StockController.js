const Stock = require("../model/Stock");
const elasticsearchClient = require('../elasticsearch');

const AddStock = async (req, res) => {
    try {
      const add_stock = await Stock.create(req.body);


      res.send({message:'stock add successfully',stock:add_stock});
    } catch (e) {
        console.log('err',e);
      res.status(400).send(e.message);
    }
  };

const BulkAddStock = async(req,res) => {
  try{

    const bulk_add_stock = await Stock.insertMany(req.body);
    res.send({status:200,success:true,message:'stock update successfully',data:bulk_add_stock})
  }
  catch(err){
    console.log('err',err);
  }
}  

  module.exports = { AddStock,BulkAddStock};
