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

 
  module.exports = {AddCategory};
