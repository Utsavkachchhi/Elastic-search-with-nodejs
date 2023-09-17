const  mongoose = require('mongoose');
const mongoosastic = require('mongoosastic');
const elasticsearchClient = require('../elasticsearch');

const productSchema = new mongoose.Schema({

    name: {type: String,es_indexed:true},
    price: {type : Number,es_indexed:true},
    category: {type: String,es_indexed:true},
    description: {type : String,es_indexed:true},
    image: {type : String,es_indexed:true},

});   
productSchema.index({category: 1});

productSchema.plugin(mongoosastic,{esClient:elasticsearchClient})


const Product = new mongoose.model("Product",productSchema);


// Define an Elasticsearch index
// const indexName = 'products';


// async function createIndex() {
//     try {
//       // Check if the index already exists
//       const indexExists = await elasticsearchClient.indices.exists({ index: indexName });
  
//       if (!indexExists.body) {
//         // Create the index if it doesn't exist
//         await elasticsearchClient.indices.create({
//           index: indexName,
//           body: {
//             mappings: {
//               properties: {
//                 name: { type: 'text' },
//                 price: { type: 'float' },
//                 description: { type: 'text' },
//                 image: { type: 'text' }
//               }
//             }
//           }
//         });
//         console.log(`Index '${indexName}' created with mapping.`);
//       } else {
//         console.log(`Index '${indexName}' already exists.`);
//       }
//     } catch (error) {
//     //   console.error('Error creating index:', error);
//     }
//   }

  // Call the function to create the index
  // createIndex();

// productSchema.post('save', async function(doc) {
//     console.log('doc',doc);
//     try {
//       // Index the updated document in Elasticsearch
//      const add_data =await elasticsearchClient.index({
//         index: indexName,
//         id: doc._id.toString(),
//         body: {
//             name: doc.name,
//             price: doc.price,
//             description: doc.description,
//             image: doc.image,
//         },
//       });
//       console.log('Elasticsearch document updated:', add_data);
//     } catch (error) {
//       console.error('Error updating Elasticsearch document:', error);
//     }
//   });




module.exports = Product;
