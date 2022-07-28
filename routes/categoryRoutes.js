const express = require('express');
const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  // .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
//   .delete(categoryController.deleteCategory);

module.exports = router;
