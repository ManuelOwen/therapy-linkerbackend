"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVehicleSpecificationService = exports.updateVehicleSpecificationService = exports.createVehicleSpecificationService = exports.getVehicleSpecificationByIdService = exports.vehicleSpecificationService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const vehicleSpecificationService = async (limit) => {
    if (limit) {
        return await db_1.db.query.vehicleSpecificationTable.findMany({ limit: limit });
    }
    return await db_1.db.query.vehicleSpecificationTable.findMany();
};
exports.vehicleSpecificationService = vehicleSpecificationService;
const getVehicleSpecificationByIdService = async (id) => {
    return await db_1.db.query.vehicleSpecificationTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationTable.vehiclespec_id, id)
    });
};
exports.getVehicleSpecificationByIdService = getVehicleSpecificationByIdService;
const createVehicleSpecificationService = async (user) => {
    await db_1.db.insert(schema_1.vehicleSpecificationTable).values(user);
    return "vehicleSpecification created successfully";
};
exports.createVehicleSpecificationService = createVehicleSpecificationService;
const updateVehicleSpecificationService = async (id, user) => {
    await db_1.db.update(schema_1.vehicleSpecificationTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationTable.vehiclespec_id, id));
    return "vehicleSpecification updated successfully";
};
exports.updateVehicleSpecificationService = updateVehicleSpecificationService;
const deleteVehicleSpecificationService = async (id) => {
    await db_1.db.delete(schema_1.vehicleSpecificationTable).where((0, drizzle_orm_1.eq)(schema_1.vehicleSpecificationTable.vehiclespec_id, id));
    return "vehicleSpecification deleted successfully";
};
exports.deleteVehicleSpecificationService = deleteVehicleSpecificationService;
