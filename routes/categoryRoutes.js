const express = require('express');
const categoryController = require('./../controllers/categoryController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(categoryController.getAllCategories)
  .post(categoryController.createCategory);

router
  .route('/:id')
  .get(categoryController.getCategory)
  .put(categoryController.editCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
