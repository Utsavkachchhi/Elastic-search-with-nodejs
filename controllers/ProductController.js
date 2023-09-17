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

const BulkAddProduct = async(req,res) => {
  try{

    const bulk_add_product = await Product.insertMany(req.body);
    res.send({status:200,success:true,message:'book update successfully',data:bulk_add_product})
  }
  catch(err){
    console.log('err',err);
  }
} 

const GetProduct = async(req,res) => {
  try{
    const page = req.query.page || 1; // Get the requested page number from the query parameters
    const perPage = req.query.recordsPerPage || 3; 

    const product_data = await elasticsearchClient.search({
      index: 'products', // Replace with your Elasticsearch index name
      body : {
      query: {
        match_all: {}
      },
      from: (page - 1) * perPage,
      size: perPage 
      // profile: true
    },
    });
    
    // Query data from Elasticsearch
    if (product_data.hits && product_data.hits.hits) {
      const elasticsearchResults = product_data.hits.hits.map((hit) => hit._source);
      res.send({Product:elasticsearchResults});

    }
    else{
      res.send({message:'no products found!'});
    }
  }
  catch(err){
    console.log('err',err);
  }
}

const GetProductSuggestion = async(req,res) => {
  try{
    const product_data = await elasticsearchClient.search({
      index: ['products','categories','stocks'], // Replace with your Elasticsearch index name
      body : {
        query: {
          bool: {
            should: [
              {
                wildcard: {
                  "name": `*${req.query.search}*`
                }
              }
            ]
          }
      }
    },
    });
   
    // console.log('res',product_data);
    if (product_data.hits && product_data.hits.hits) {
      const elasticsearchResults = product_data.hits.hits.map((result) =>{ return {_id: result._id,name:result._source.name} });
      res.send({status:200,success:true,search_result:elasticsearchResults});

    }
    else{
      res.send({message:'no results found!'});
    }
    
  }
  catch(err){
    console.log('err',err);
  }
}

const GetProductSuggestionResult = async(req,res) => {
  try{
    const product_data = await elasticsearchClient.search({
      index: ['products','stocks'], // Replace with your Elasticsearch index name
      body : {
        query: {
          bool: {
            should: [
              {
                term: {
                  "_id": `${req.params.id}`
                }
              },
              {
                match_phrase_prefix: {
                  "category": `${req.params.id}`
                }
              }
            ]
          }
        }
    },
    });
   
    // console.log('res',product_data);
    if (product_data.hits && product_data.hits.hits) {
      const elasticsearchResults = product_data.hits.hits.map((result) =>{ return {_id: result._id,name:result._source.name,price:result._source.price} });
      res.send({status:200,success:true,search_result:elasticsearchResults});

    }
    else{
      res.send({message:'no results found!'});
    }
    
  }
  catch(err){
    console.log('err',err);
  }
}

  module.exports = { AddProduct, UpdateProduct,deleteProduct,BulkAddProduct,GetProduct,GetProductSuggestion,GetProductSuggestionResult};
