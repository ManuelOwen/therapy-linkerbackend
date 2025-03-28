/**
 * Converts specified date fields in an object to ISO string format.
 * 
 * @param obj - The object containing date fields to convert.
 * @param fields - An array of field names that should be converted to ISO string.
 */
function convertDateFieldsToISO(obj: Record<string, any>, fields: string[]): void {
    fields.forEach(field => {
      if (obj[field]) {
        const date = new Date(obj[field]);
        if (!isNaN(date.getTime())) {
          obj[field] = date.toISOString();
        }
      }
    });
  }
  
  // Example usage:
  
  interface ExampleObject {
    createdAt: string | Date;
    updatedAt: string | Date;
    otherField: string;
  }
  
  const exampleObject: ExampleObject = {
    createdAt: new Date(),
    updatedAt: '2024-07-03T00:00:00Z',
    otherField: 'example'
  };
  
  convertDateFieldsToISO(exampleObject, ['createdAt', 'updatedAt']);
  
  console.log(exampleObject);
  export default convertDateFieldsToISO;
  