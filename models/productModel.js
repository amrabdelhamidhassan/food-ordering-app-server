const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Product must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A Product name must have less or equal then 40 characters'],
      minlength: [3, 'A Product name must have more or equal then 3 characters'],
    },
    slug: String,
    price:{
      type:Number,
      required: [true, 'A Product must have a price'],
    },
    stock:
    {
      type:Number,
      required:[true,'A Product must have a stock']
    },
    description:
    {
      type:String,
    },
    image:
      {
        type:String,
      },
    subCategory:
    {
      type:mongoose.ObjectId,
      ref:'SubCategory',
      required: [true, 'A Product must have a SubCategory'],
    }
      
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

productSchema.index({ slug: 1 });
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
productSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
