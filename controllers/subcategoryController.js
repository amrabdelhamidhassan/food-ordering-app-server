const SubCategory = require('./../models/SubCategoryModel');
const QueryHelpers=require('./../utils/QueryHelpers')
exports.getAllSubCategories = QueryHelpers.getAll(SubCategory,{path:'category products'})
exports.getSubCategory = QueryHelpers.getOne(SubCategory,{path:'category products'})
exports.createSubCategory = QueryHelpers.createOne(SubCategory)
exports.deleteSubCategory = QueryHelpers.deleteOne(SubCategory)
exports.editSubCategory = QueryHelpers.editOne(SubCategory,{path:'category products'})
