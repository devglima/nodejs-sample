import Orders from '../Models/Orders.js';
import axios from 'axios';
import User from '../Models/user.js';
import OrderStatus from '..//Models/OrdersStatuses.js';
import Payments from '../Models/Payments.js';
import ProductOrders from '../Models/FoodOrders.js';
import Foods from '../Models/Foods.js';
import moment from 'moment';

export class OrderRepository {
   static async create(req) {
      const { user_id, order_status_id, tax } = req.body;

      return await Orders.create({
         user_id,
         order_status_id,
         tax,
      });
   }

   static filters(user_id, request) {
      var { order_status_id, user_id: userId, date_range } = request.query;
      const params = {
         user_id,
      };

      //Chnage user_id value if exist query user_id
      if (userId) params['user_id'] = userId;

      if (Array.isArray(order_status_id)) {
         params['order_status_id'] = {
            $in: order_status_id.map((value) => parseInt(value)),
         };
      }

      //Set filter date by range
      /* if (date_range) {
         const ranges = date_range.split(' - ');

         params['created_at'] = {
            $gte: moment(ranges[0]).toISOString(),
            $lt: moment(ranges[1]).toISOString(),
         };
      }
 */
      return params;
   }

   static async get($match) {
      let orders = await Orders.aggregate([{ $match }]).sort({
         createdAt: 'desc',
      });

      orders = orders.map(async (order) => {
         order.user = await User.findById(order.user_id).select({
            name: 1,
            email: 1,
         });

         order.orderStatus = await OrderStatus.findOne({
            id: order.order_status_id,
         }).select({ id: 1, status: 1 });

         order.payment = await Payments.findOne({
            user_id: order.user_id,
         }).select({
            price: 1,
            status: 1,
            description: 1,
            method: 1,
         });

         //Order products
         let foodOrders = await ProductOrders.aggregate([
            {
               $match: {
                  order_id: order.id,
               },
            },
         ]).project({
            price: 1,
            quantity: 1,
            order_id: 1,
            cIDProduct: 1,
            updated_at: 1,
         });

         foodOrders = foodOrders.map(async (item) => {
            item.food = await Foods.findOne({
               cIDProduct: item.cIDProduct,
            }).select({
               id: 1,
               name: 1,
               price: 1,
               description: 1,
               image: 1,
            });

            return item;
         });

         order.food_orders = await Promise.all(foodOrders);
         return order;
      });

      return await Promise.all(orders);
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
