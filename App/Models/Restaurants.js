'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const RestaurantsSchema = new Schema({
   id: {
      type: Number,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
});

const Restaurants = model('restaurants', RestaurantsSchema);

export default Restaurants;
