const {Router} = require('express')
const review = new Router();

const {BulkAddReview} = require("../controllers/ReviewController");


review.post('/bulkReview',BulkAddReview)

module.exports = review;
