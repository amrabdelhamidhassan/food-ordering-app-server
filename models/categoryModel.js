const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A Category must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A Category name must have less or equal then 40 characters'],
      minlength: [3, 'A Category name must have more or equal then 3 characters'],
    },
    slug: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

categorySchema.index({ slug: 1 });
categorySchema.virtual('subCategories',
{
  ref:'SubCategory',
  foreignField:'category',
  localField:'_id'
})
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
categorySchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
