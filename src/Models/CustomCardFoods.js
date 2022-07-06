'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const AutoIncrement = Inc(mongoose);
const { Schema, model } = mongoose;

const CustomCardFoodSchema = new Schema(
   {
      user_id: { type: Number, required: true },
      custom_card_id: { type: Number, required: true },
      cIDCompany: { type: Number },
      cIDProduct: { type: Number },
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

CustomCardFoodSchema.plugin(AutoIncrement, {
   id: 'custom_card_food_id',
   inc_field: 'id',
});
const CustomCardFoods = model('custom_card_foods', CustomCardFoodSchema);

export default CustomCardFoods;
