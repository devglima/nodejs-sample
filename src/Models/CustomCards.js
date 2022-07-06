'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const CustomCardSchema = new Schema(
   {
      id: { type: Number, required: true },
      name: { type: Number, required: true },
      cIDCompany: { type: Number },
      cIDProduct: { type: String },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

CustomCardSchema.plugin(AutoIncrement, {
   id: 'custom_card_id',
   inc_field: 'id',
});
const CustomCards = model('custom_cards', CustomCardSchema);

export default CustomCards;
