'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FaqsSchema = new Schema({
   id: {
      type: Number,
   },
   question: {
      type: String,
      required: true,
   },
   answer: {
      type: String,
      required: true,
   },
   faq_category_id: {
      type: Number,
   },
   created_at: {
      type: String,
   },
   updated_at: {
      type: String,
   },
});

const Faqs = model('faqs', FaqsSchema);
export default Faqs;
