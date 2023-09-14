
const express = require("express");
require("./config/Conn")

const cors = require('cors')
const User = require("./model/User")

const router = require('./routers/user')
const book = require('./routers/book')
const product = require('./routers/product')
const stock = require('./routers/stock')
const app = express();



var options = {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
  app.use(cors(options));
// app.use(cors())


app.use(express.json());
app.use(express.urlencoded({ extended : false}))

// const esClient = new elasticsearch.Client({
//   host: '127.0.0.1:9200', // Replace with your Elasticsearch cluster host and port
//   log: 'error', // Set the logging level
// });

app.use('/api/user',router)
app.use('/api/product',product);
app.use('/api/book',book)
app.use('/api/stock',stock)

app.listen(8080)