import Categories from '../Models/Categories.js';

export class CategoryRepository {
   static filters(request) {
      const params = {};
      const { src: srcValue } = request.query;

      //Search filter
      if (srcValue) {
         params['$or'] = [{ name: { $regex: `.*${srcValue}.*` } }];
      }

      return params;
   }

   static async get(request) {
      const { page, limit } = request.query;

      const filters = CategoryRepository.filters(request);

      const options = {
         page: parseInt(page ?? 1),
         limit: parseInt(limit ?? 10),
      };

      return await Categories.paginate(filters, options);
   }
}
