const express = require('express');
const subCategoryController = require('./../controllers/subcategoryController');
const authController = require('./../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(subCategoryController.getAllSubCategories)
  .post(subCategoryController.createSubCategory);

router
  .route('/:id')
  .get(subCategoryController.getSubCategory)
  .put(subCategoryController.editSubCategory)
  .delete(subCategoryController.deleteSubCategory);

module.exports = router;
