import axios from 'axios';
import Cart from '../Models/Carts.js';
import Products from '../Models/Foods.js';

export class CartRepository {
   static async get($match) {
      let carts = await Cart.aggregate([
         {
            $match,
         },
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
      ])
         .sort({ created_at: 'desc' })
         .project({
            food_id: 0,
            delivery_address_id: 0,
         });

      //Get products by cIdPRoduct and cIDCompany
      carts = carts.map(async (cart) => {
         var product = await Products.findOne({
            cIDCompany: cart.cIDCompany,
            cIDProduct: cart.cIDProduct,
         }).select({ cIDProduct: 0, cIDCompany: 0 });

         cart.product = product;
         return cart;
      });

      return await Promise.all(carts);
   }

   static async paymentConditionPrice(data) {
      const url = 'https://prdweb-produto.mc1.com.br//WTM_API/parameter';
      return await axios.post(url, data, {
         headers: {
            'Content-Type': 'application/json',
         },
      });
   }
}
