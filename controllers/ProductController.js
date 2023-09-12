const Product = require("../model/Product");
const elasticsearchClient = require('../elasticsearch');

const AddProduct = async (req, res) => {
    try {
      const addProduct = await Product.create(req.body);

    //        const add_data =await elasticsearchClient.index({
    //     index: 'products',
    //     id: addProduct._id.toString(),
    //     body: {
    //         name: addProduct.name,
    //         price: addProduct.price,
    //         description: addProduct.description,
    //         image: addProduct.image,
    //     },
    //   });
    //   console.log('Elasticsearch document updated:', add_data);

      res.send({message:'product add successfully',product:addProduct});
    } catch (e) {
        console.log('err',e);
      res.status(400).send(e.message);
    }
  };

const UpdateProduct = async(req,res) => {
  try{
    let bookId = req.params.id;

    const updateProduct = await Product.findByIdAndUpdate(bookId,req.body,{new:true});
    res.send({status:200,success:true,message:'book update successfully',data:updateProduct})
  }
  catch(err){
    console.log('err',err);
  }
}  

const deleteProduct = async(req,res) => {
  try{
     let bookId = req.params.id;

    const deleteProduct = await Product.findByIdAndDelete(bookId);
    res.send({status:200,success:true,message:'book delete successfully',data:deleteProduct})
  }
  catch(err){
    console.log('err',err);
  }


}

  module.exports = { AddProduct, UpdateProduct,deleteProduct};
