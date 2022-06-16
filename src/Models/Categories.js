import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const CategoriesSchema = new Schema(
   {
      id: {
         type: Number,
      },
      name: {
         type: String,
         required: true,
      },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

const Categories = model('categories', CategoriesSchema);
export default Categories;
