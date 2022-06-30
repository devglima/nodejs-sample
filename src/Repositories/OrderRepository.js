import Orders from '../Models/Orders.js';
import axios from 'axios';

export class OrderRepository {
   static async create(req) {
      const { user_id, order_status_id, tax } = req.body;

      return await Orders.create({
         user_id,
         order_status_id,
         tax,
      });
   }

   static async get($match) {
      return Orders.find().where($match);

      /* await Orders.aggregate([
         {
            $match,
         },
          {
            $lookup: {
               from: 'users',
               localField: 'id',
               foreignField: 'user_id',
               as: 'user',
               pipeline: [
                  {
                     $project: { name: 1, id: 1, email: 1 },
                  },
               ],
            },
         }, 
         /* {
            $lookup: {
               from: 'order_statuses',
               localField: 'order_status_id',
               foreignField: 'id',
               as: 'order_status',
               pipeline: [
                  {
                     $project: { status: 1, id: 1 },
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
                     $project: { status: true, id: true, price: true },
                  },
               ],
            },
         }, 
         //{ $unwind: '$user' },
         //{ $unwind: '$order_status' },
         //{ $unwind: '$payment' },
      ])
         .sort({ created_at: 'desc' })
         .project({
            food_id: 0,
         }); */
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
      const auth = await axios.post(authUrl, authData, {
         headers: {
            'Content-Type': 'application/json',
         },
      });

      if (!auth.data.access_token) return; //If not token return null

      //get pix invoice data
      const api = `${process.env.BAVABANK_API}/pix/v1/accounts/434fdcfb-8dd8-42f4-bb13-abd6d0ec5a8b/invoices`;

      data.expiration_time = 172800;
      data.payment_label = 'Pagamento PIX';

      const pixInvoice = await axios.post(api, data, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${auth.data.access_token}`,
         },
      });

      return pixInvoice;
   }
}
