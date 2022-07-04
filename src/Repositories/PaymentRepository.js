import Payments from '../Models/Payments.js';
import axios from 'axios';
import User from '../Models/user.js';

export class PaymentRepository {
   static async paymentCash(req) {
      const { user_id, price, method } = req.body;

      return await Payments.create({
         user_id,
         price,
         method,
         status: 'Esperando Cliente',
         description: 'Payment pending',
      });
   }

   static async get($match = {}) {
      let payments = await Payments.aggregate([{ $match }])
         .sort({ created_at: 'desc' })
         .project({
            food_id: 0,
         });

      payments = payments.map(async (payment) => {
         payment.user = await User.findById(payment.user_id).select({
            id: 1,
            name: 1,
            email: 1,
         });

         return payment;
      });

      return await Promise.all(payments);
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
