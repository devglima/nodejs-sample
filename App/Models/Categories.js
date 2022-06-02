import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategoriesSchema = new Schema({
   id: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
});

const Categories = model('categories', CategoriesSchema);
export default Categories;
