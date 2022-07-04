'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const FavoritesSchema = new Schema({
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
});

const Favorites = model('favorites', FavoritesSchema);

export default Favorites;
