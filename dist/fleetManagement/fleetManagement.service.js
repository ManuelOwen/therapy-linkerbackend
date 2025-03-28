"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletefleetManagementService = exports.updatefleetManagementService = exports.createfleetManagementService = exports.getfleetManagementService = exports.fleetManagementService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const fleetManagementService = async (limit) => {
    if (limit) {
        return await db_1.db.query.fleetManagementTable.findMany({ limit: limit });
    }
    return await db_1.db.query.fleetManagementTable.findMany();
};
exports.fleetManagementService = fleetManagementService;
const getfleetManagementService = async (id) => {
    return await db_1.db.query.fleetManagementTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.fleet_id, id)
    });
};
exports.getfleetManagementService = getfleetManagementService;
const createfleetManagementService = async (user) => {
    await db_1.db.insert(schema_1.fleetManagementTable).values(user);
    return "fleet created successfully";
};
exports.createfleetManagementService = createfleetManagementService;
const updatefleetManagementService = async (id, user) => {
    await db_1.db.update(schema_1.fleetManagementTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.fleet_id, id));
    return "fleet updated successfully";
};
exports.updatefleetManagementService = updatefleetManagementService;
const deletefleetManagementService = async (id) => {
    await db_1.db.delete(schema_1.fleetManagementTable).where((0, drizzle_orm_1.eq)(schema_1.fleetManagementTable.fleet_id, id));
    return "fleet deleted successfully";
};
exports.deletefleetManagementService = deletefleetManagementService;
