/**
 * @param {yup.ObjectSchema} schema
 * @returns {Function}
 * @description
 * This function is used to validate unique values on the database.
 */
const unique = (yup) => {
   yup.addMethod(yup.mixed, 'unique', function (args) {
      const { model, column, message } = args;

      return this.test('unique', message, function (value) {
         let data = {};
         data[column] = value;

         const result = model.findOne({ where: data });
         return result !== null;
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
