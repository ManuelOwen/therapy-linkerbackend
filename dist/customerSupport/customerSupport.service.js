"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletecustomerSupportService = exports.updatecustomerSupportService = exports.insertcustomerSupportService = exports.getCustomerSupportbyIdService = exports.customerSupportService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const customerSupportService = async () => {
    return await db_1.db.query.customerSupportTable.findMany();
};
exports.customerSupportService = customerSupportService;
const getCustomerSupportbyIdService = async (id) => {
    return await db_1.db.query.customerSupportTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.customerSupportTable, id)
    });
};
exports.getCustomerSupportbyIdService = getCustomerSupportbyIdService;
const insertcustomerSupportService = async (customerSupport) => {
    await db_1.db.insert(schema_1.customerSupportTable).values(customerSupport);
    // .returning({id:customerSupportTable.customerSupport_id}
    return "customerSupport created successfully ";
};
exports.insertcustomerSupportService = insertcustomerSupportService;
const updatecustomerSupportService = async (id, customerSupport) => {
    await db_1.db.update(schema_1.customerSupportTable).set(customerSupport).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTable, id));
    return "customerSupport updated successfully ";
};
exports.updatecustomerSupportService = updatecustomerSupportService;
const deletecustomerSupportService = async (id) => {
    await db_1.db.delete(schema_1.customerSupportTable).where((0, drizzle_orm_1.eq)(schema_1.customerSupportTable, id));
    return "customerSupport deleted successfully ";
};
exports.deletecustomerSupportService = deletecustomerSupportService;
