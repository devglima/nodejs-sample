'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FoodsSchema = new Schema({
   id: {
      type: Number,
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
});

const Foods = model('foods', FoodsSchema);
export default Foods;
