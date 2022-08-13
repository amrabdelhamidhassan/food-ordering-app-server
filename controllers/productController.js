const Product = require('./../models/productModel');
const QueryHelpers=require('./../utils/QueryHelpers')
exports.getAllProducts = QueryHelpers.getAll(Product,{path:'subCategory'})
exports.getProduct= QueryHelpers.getOne(Product,{path:'subCategory'})
exports.createProduct = QueryHelpers.createOne(Product)
exports.deleteProduct = QueryHelpers.deleteOne(Product)
exports.editProduct = QueryHelpers.editOne(Product,{path:'subCategory'})
