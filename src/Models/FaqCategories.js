'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FaqCategoriesSchema = new Schema({
   id: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   created_at: {
      type: String,
   },
   updated_at: {
      type: String,
   },
   custom_fields: {
      type: Array,
   },
});

const FaqCategories = model('faq_categories', FaqCategoriesSchema);

export default FaqCategories;
