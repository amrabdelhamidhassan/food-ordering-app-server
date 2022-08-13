const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema(
  {
    status:
    {
      type:String,
      enum: ['delivered','prepared','accepted']
    },
    totalPrice:
    {
      type:Number,
      required: [true, 'Order must have a total price'],
    },
    totalNumberOfItems:
    {
      type:Number,
      required: [true, 'Order must have a totalNumberofItems'],
    },
    user:
    {
      type:mongoose.ObjectId,
      ref:'User',
      required: [true, 'Order must belongs to a User'],
    },
    products:[
      {
        numberofProductItems:
        {
          type:Number,
          default:1
        },
        product:
        {
          type:mongoose.ObjectId,
          ref:'Product',
          required: [true, 'Each Cart Item must contain product ID'],
        }
      }
    ]
 
      
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
