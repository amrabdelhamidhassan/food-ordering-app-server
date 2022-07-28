const Category = require('./../models/categoryModel');
const QueryHelpers=require('./../utils/QueryHelpers')
exports.getAllCategories = QueryHelpers.getAll(Category)
exports.getCategory = QueryHelpers.getOne(Category)
exports.createCategory = ()=>
{
    
}
exports.deleteCategory = ()=>
{
    
}
