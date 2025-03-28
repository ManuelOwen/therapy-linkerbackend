"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Converts specified date fields in an object to ISO string format.
 *
 * @param obj - The object containing date fields to convert.
 * @param fields - An array of field names that should be converted to ISO string.
 */
function convertDateFieldsToISO(obj, fields) {
    fields.forEach(field => {
        if (obj[field]) {
            const date = new Date(obj[field]);
            if (!isNaN(date.getTime())) {
                obj[field] = date.toISOString();
            }
        }
    });
}
const exampleObject = {
    createdAt: new Date(),
    updatedAt: '2024-07-03T00:00:00Z',
    otherField: 'example'
};
convertDateFieldsToISO(exampleObject, ['createdAt', 'updatedAt']);
console.log(exampleObject);
exports.default = convertDateFieldsToISO;
