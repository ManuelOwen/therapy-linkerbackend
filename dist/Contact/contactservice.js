"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContactService = exports.updateContactService = exports.insertContactService = exports.getContactbyIdService = exports.contactService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const contactService = async () => {
    return await db_1.db.query.contactTable.findMany();
};
exports.contactService = contactService;
const getContactbyIdService = async (id) => {
    return await db_1.db.query.contactTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.contactTable, id)
    });
};
exports.getContactbyIdService = getContactbyIdService;
const insertContactService = async (contact) => {
    await db_1.db.insert(schema_1.contactTable).values(contact);
    // .returning({id:contactTable.contact_id}
    return "contact created successfully ";
};
exports.insertContactService = insertContactService;
const updateContactService = async (id, contact) => {
    await db_1.db.update(schema_1.contactTable).set(contact).where((0, drizzle_orm_1.eq)(schema_1.contactTable, id));
    return "contact updated successfully ";
};
exports.updateContactService = updateContactService;
const deleteContactService = async (id) => {
    await db_1.db.delete(schema_1.contactTable).where((0, drizzle_orm_1.eq)(schema_1.contactTable, id));
    return "contact deleted successfully ";
};
exports.deleteContactService = deleteContactService;
