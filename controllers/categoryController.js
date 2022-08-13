const Category = require('./../models/categoryModel');
const QueryHelpers=require('./../utils/QueryHelpers')
exports.getAllCategories = QueryHelpers.getAll(Category,{path:'subCategories'})
exports.getCategory = QueryHelpers.getOne(Category,{path:'subCategories'})
exports.createCategory = QueryHelpers.createOne(Category)
exports.deleteCategory = QueryHelpers.deleteOne(Category)
exports.editCategory = QueryHelpers.editOne(Category,{path:'subCategories'})