import Payments from '../Models/Payments.js';
import axios from 'axios';

export class PaymentRepository {
   static async get() {
      return await Payments.aggregate([
         {
            $lookup: {
               from: 'users',
               localField: 'user_id',
               foreignField: 'id',
               as: 'user',
               pipeline: [
                  {
                     $project: { name: 1, email: 1 },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: 'order_statuses',
               localField: 'order_status_id',
               foreignField: 'id',
               as: 'order_status',
               pipeline: [
                  {
                     $project: { status: 1, _id: 0, id: 1 },
                  },
               ],
            },
         },
         {
            $lookup: {
               from: 'payments',
               localField: 'payment_id',
               foreignField: 'id',
               as: 'payment',
               pipeline: [
                  {
                     $project: { status: 1, _id: 0, id: 1 },
                  },
               ],
            },
         },
         { $unwind: '$user' },
         { $unwind: '$order_status' },
         { $unwind: '$payment' },
      ])
         //.sort({ created_at: 'desc' })
         .project({
            food_id: 0,
         });
   }

   static async getParameters(data) {
      const url = `${process.env.WTM_API}/parameter`;
      return await axios.post(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }

   static async getPix(data) {
      const authData = {
         audience: `${process.env.BAVABANK_API}/pix/v1/`,
         grant_type: 'client_credentials',
         client_id: process.env.BAVABANK_PIX_CLIENT_ID,
         client_secret: process.env.BAVABANK_PIX_CLIENT_SECRET,
      };

      //Get client token
      const authUrl = `${process.env.BAVABANK_API}/oauth2/access-token`;
      const auth = await await axios.post(authUrl, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });

      return auth;

      /* return await axios.post(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      }); */
   }
}
