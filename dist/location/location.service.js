"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationWithBranchService = exports.deleteLocationService = exports.updateLocationService = exports.insertLocationService = exports.getLocationService = exports.locationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const locationService = async () => {
    return await db_1.db.query.locationTable.findMany();
};
exports.locationService = locationService;
const getLocationService = async (id) => {
    return await db_1.db.query.locationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.locationTable.id, id)
    });
};
exports.getLocationService = getLocationService;
const insertLocationService = async (location) => {
    await db_1.db.insert(schema_1.locationTable).values(location);
    return "location created successfully ";
};
exports.insertLocationService = insertLocationService;
const updateLocationService = async (id, location) => {
    await db_1.db.update(schema_1.locationTable).set(location).where((0, drizzle_orm_1.eq)(schema_1.locationTable.id, id));
    return "location updated successfully ";
};
exports.updateLocationService = updateLocationService;
const deleteLocationService = async (id) => {
    await db_1.db.delete(schema_1.locationTable).where((0, drizzle_orm_1.eq)(schema_1.locationTable, id));
    return "location deleted successfully ";
};
exports.deleteLocationService = deleteLocationService;
// get location with branch
const getLocationWithBranchService = async () => {
    return await db_1.db.query.locationTable.findMany({
        with: {
            branch: true
        }
    });
};
exports.getLocationWithBranchService = getLocationWithBranchService;
