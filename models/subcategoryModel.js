const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A SubCategory must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A SubCategory name must have less or equal then 40 characters'],
      minlength: [3, 'A SubCategory name must have more or equal then 3 characters'],
    },
    slug: String,
    category:
    {
      type:mongoose.ObjectId,
      ref:'Category',
      required: [true, 'A SubCategory must have a parent Category'],
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

subCategorySchema.index({ slug: 1 });
subCategorySchema.virtual('products',
{
  ref:'Product',
  foreignField:'subCategory',
  localField:'_id'
})
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
subCategorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
