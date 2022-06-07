'use strict';
import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FaqsSchema = new Schema(
   {
      id: {
         type: Number,
      },
      faq_category_id: {
         type: ObjectId,
         required: true,
      },
      question: {
         type: String,
         required: true,
      },
      answer: {
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

const Faqs = model('faqs', FaqsSchema);
export default Faqs;
