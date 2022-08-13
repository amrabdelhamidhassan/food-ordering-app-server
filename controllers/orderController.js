const Order = require('./../models/orderModel');
const QueryHelpers=require('./../utils/QueryHelpers')
exports.getAllOrders = QueryHelpers.getAll(Order,{path:'user products.product'})
exports.getOrder= QueryHelpers.getOne(Order,{path:'user products.product'})
exports.createOrder = QueryHelpers.createOne(Order)
exports.deleteOrder = QueryHelpers.deleteOne(Order)
exports.editOrder = QueryHelpers.editOne(Order,{path:'user products.product'})
