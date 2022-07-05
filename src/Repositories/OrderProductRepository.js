import Products from '../Models/Orders.js';
import ProductOrders from '../Models/FoodOrders.js';
import Foods from '../Models/Foods.js';

export class OrderProductRepository {
   static async create() { }

   static async get($match) {
      let orders = await Products.aggregate([{ $match }]).sort({
         createdAt: 'desc',
      });

      orders = orders.map(async (order) => {
         order.food_orders = await ProductOrders.find({ order_id: order.id }).select({
            id: 1,
            price: 1,
            quantity: 1,
            order_id: 1,
            cIDProduct: 1,
            created_at: 1
         });

         order.food_orders.food = await Foods.find({ cIDProduct: order.food_orders.cIDProduct }).select({
            id: 1,
            name: 1,
            price: 1,
            discountPrice: 1,
            image: 1,
            description: 1,
            ingredients: 1,
            weight: 1,
            featured: 1,
            cIDProduct: 1,
            cIDCompany: 1,
            cImage: 1,
            xIDUnitMeasureType: 1,
         });

         return order;
      });

      return await Promise.all(orders);
   }
}
