import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';
import paginate from 'mongoose-paginate-v2';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const CategoriesSchema = new Schema(
   {
      id: { type: Number },
      image: { type: String },
      name: {
         type: String,
         required: true,
      },
      description: { type: String },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
      versionKey: false,
   }
);

CategoriesSchema.plugin(AutoIncrement, { id: 'category_id', inc_field: 'id' });
CategoriesSchema.plugin(paginate);

const Categories = model('categories', CategoriesSchema);
export default Categories;
