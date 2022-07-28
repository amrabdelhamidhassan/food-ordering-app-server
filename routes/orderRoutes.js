const express = require('express');
const orderController = require('./../controllers/orderController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(orderController.getAllOrders)
  .post(orderController.createCategory);

router
  .route('/:id')
  .get(orderController.getCategory)
  .delete(orderController.deleteCategory);

module.exports = router;