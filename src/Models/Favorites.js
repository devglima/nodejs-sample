'use strict';
import mongoose from 'mongoose';
import Inc from 'mongoose-sequence';

const { Schema, model } = mongoose;

const AutoIncrement = Inc(mongoose);

const FavoritesSchema = new Schema(
   {
      id: {
         type: Number,
         required: true,
      },
      user_id: {
         type: mongoose.Types.ObjectId,
         required: true,
      },
      cIDCompany: {
         type: String,
         required: true,
      },
      cIDProduct: {
         type: String,
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
   },
   {
      timestamps: {
         createdAt: 'created_at',
         updatedAt: 'updated_at',
      },
   }
);

FavoritesSchema.plugin(AutoIncrement, { id: 'favorite_id', inc_field: 'id' });
const Favorites = model('favorites', FavoritesSchema);

export default Favorites;
