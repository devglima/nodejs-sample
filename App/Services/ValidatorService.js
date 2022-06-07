/**
 * @param {yup.ObjectSchema} schema
 * @returns {Function}
 * @description
 * This function is used to validate unique values on the database.
 */
const unique = (yup) => {
   yup.addMethod(yup.mixed, 'unique', function (args) {
      const { table, column, where, message } = args;

      return this.test('unique', message, async function (value) {
         let query = {};
         query[column] = value;
         if (typeof where !== 'undefined') query = { ...query, ...where };

         const result = await table.find({ ...query });
         console.log(result);
         return result.length === 0;
      });
   });
};

/**
 *
 * @param {*} yup
 * @description
 * Call all custom validatores
 */
const validatores = (yup) => {
   unique(yup);
};

export default validatores;
