'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);

const { Schema, model } = mongoose;

const ProductsSchema = new Schema(
   {
      _id: {
         type: mongoose.Types.ObjectId,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      price: {
         type: Number,
         required: true,
      },
      discount_price: {
         type: Number,
         required: true,
      },
      description: {
         type: String,
         required: true,
      },
      ingredients: {
         type: String,
      },
      weight: {
         type: Number,
         required: true,
      },
      featured: {
         type: Number,
         required: true,
      },
      restaurant_id: {
         type: Number,
         required: true,
      },
      category_id: {
         type: Number,
         required: true,
      },
      created_at: {
         type: String,
      },
      updated_at: {
         type: String,
      },
      cIDCompany: {
         type: String,
         required: true,
      },
      cIDProduct: {
         type: String,
         required: true,
      },
      cImage: {
         type: String,
         required: true,
      },
      xIDUnitMeasureType: {
         type: String,
      },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

ProductsSchema.plugin(AutoIncrement, {
   id: 'food_id',
   inc_field: 'id',
});

const Products = model('foods', ProductsSchema);
export default Products;
