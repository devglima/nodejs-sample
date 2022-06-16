'use strict';
import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const SettingSchema = new Schema({
   app_name: {
      type: String,
      required: true,
   },
   enable_stripe: {
      type: String,
      required: true,
   },
   default_tax: {
      type: String,
      required: true,
   },
   default_currency: {
      type: String,
      required: true,
   },
   enable_paypal: {
      type: String,
      required: true,
   },
   currency_right: {
      type: String,
      required: true,
   },
   open_hour: {
      type: String,
      required: true,
   },
   close_hour: {
      type: String,
      required: true,
   },
   fp_mc1: {
      type: String,
      required: true,
   },
   fp_cartao_credito: {
      type: String,
      required: true,
   },
   fp_pix: {
      type: String,
      required: true,
   },
   fp_retail_credit: {
      type: String,
      required: true,
   },
   minimum_order: {
      type: String,
      required: true,
   },
   main_color: {
      type: String,
      required: true,
   },
   logo_home: {
      type: String,
      required: true,
   },
   logo_home_height: {
      type: String,
      required: true,
   },
   base_url: {
      type: String,
      required: true,
   },
});

const Settings = model('app_settings', SettingSchema);
export default Settings;
