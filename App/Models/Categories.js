import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategoriesSchema = new Schema({
   id: {
      type: Number,
   },
   name: {
      type: String,
      required: true,
   },
});

const Categories = model('categories', CategoriesSchema);
export default Categories;
