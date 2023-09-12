// elasticsearch.js
const elasticsearch= require('elasticsearch');

const client = new elasticsearch.Client({
  node: 'localhost:9200',
  maxRetries: 3,
  requestTimeout: 15000,
  keepAlive: true,
  auth: {
    username: 'elastic',
    password: 'password'
  }
});

async function checkElasticsearchConnection() {
  try {
    const info = await client.info();
    // console.log('info',info);
    // console.log('Elasticsearch Cluster Name:', info.cluster_name);
    // console.log('Elasticsearch Version:', info.version.number);
    console.log('Elasticsearch Connection: OK');
  } catch (error) {
    console.error('Elasticsearch connection error:', error);
  }
}

// Call the function to check the connection
checkElasticsearchConnection();


module.exports = client;
