const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/categoryModel');
const SubCategory = require('./models/SubCategoryModel');
const Product = require('./models/ProductModel');
const User = require('./models/userModel');
const Order= require('./models/orderModel');

const categoriesSeeder=require('./data/categories'); 
const subCategoriesSeeder=require('./data/subcategories'); 
const productsSeeder = require('./data/products');
const ordersSeeder = require('./data/orders');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));
// READ JSON FILE
let categories = categoriesSeeder();
let subCategories=subCategoriesSeeder();
let products=productsSeeder();
// IMPORT DATA INTO DB
const importData = async () => {
  try {
    categories=await Category.create(categories);
    let subcategoriesCount=0;
    let categoriesCount=0;
    subCategories=subCategories.map((subcategory)=>
    {
      categoriesCount+=1;
        return({
          name:subcategory.name,
          category:categories[categoriesCount%12]._id
        })
    })
    subCategories=await SubCategory.create(subCategories);
    products= products.map((product)=>
    {
      subcategoriesCount+=1;
        return({
          ...product,
          subCategory:subCategories[subcategoriesCount%50]._id
        })
    })
    products=await Product.create(products);
    let users=await User.find();
    let orders=ordersSeeder(products,users);
    orders=await Order.create(orders);
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Category.deleteMany()
    await SubCategory.deleteMany()
    await Product.deleteMany()
    await Order.deleteMany()
    process.exit();

  } catch (err) {
    console.log(err);
  }
};
const seedData=async()=>
{
  await importData();
  process.exit();

}
if (process.argv[2] === '--seed') {
  seedData()
} 
if (process.argv[2] === '--delete') {
  deleteData()
} 