'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FaqsSchema = new Schema({
   id: {
      type: Number,
      required: true,
   },
   answer: {
      type: String,
      required: true,
   },
   faq_category_id: {
      type: Number,
      required: true,
   },
   created_at: {
      type: String,
      required: true,
   },
   updated_at: {
      type: String,
      required: true,
   },
});

const Faqs = model('faqs', FaqsSchema);
export default Faqs;
