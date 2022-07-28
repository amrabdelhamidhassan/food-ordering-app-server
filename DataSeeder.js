const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/categoryModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DATABASE_PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log('DB connection successful!'));
// READ JSON FILE
const categories = JSON.parse(fs.readFileSync(`${__dirname}/data/categories.json`, 'utf-8'));
// IMPORT DATA INTO DB
console.log(categories)
const importData = async () => {
  try {
    await Category.create(categories);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};
const deleteData = async () => {
  try {
    await Category.deleteMany()
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
};
const seedData=async()=>
{
  await deleteData();
  await importData();
  process.exit();

}
if (process.argv[2] === '--seed') {
  seedData()
} 