"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleByIdWithSpecsService = exports.deleteVehicleService = exports.updateVehicleService = exports.createVehicleService = exports.getVehicleService = exports.getVehicleWithSpecificationsService = exports.vehicleService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// getting all vehicles
const vehicleService = async () => {
    return await db_1.db.query.vehiclesTable.findMany();
};
exports.vehicleService = vehicleService;
// getting all vehicles with a  vehicle spec
const getVehicleWithSpecificationsService = async () => {
    return await db_1.db.query.vehiclesTable.findMany({
        with: {
            vehicleSpecification: true
        }
    });
};
exports.getVehicleWithSpecificationsService = getVehicleWithSpecificationsService;
const getVehicleService = async (id) => {
    return await db_1.db.query.vehiclesTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id)
    });
};
exports.getVehicleService = getVehicleService;
const createVehicleService = async (user) => {
    await db_1.db.insert(schema_1.vehiclesTable).values(user);
    return "vehicle created successfully";
};
exports.createVehicleService = createVehicleService;
// update vehicle
const updateVehicleService = async (id, user) => {
    await db_1.db.update(schema_1.vehiclesTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id));
    return "vehicle updated successfully";
};
exports.updateVehicleService = updateVehicleService;
// delete vehicle
const deleteVehicleService = async (id) => {
    await db_1.db.delete(schema_1.vehiclesTable).where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id));
    return "vehicle deleted successfully";
};
exports.deleteVehicleService = deleteVehicleService;
const vehicleByIdWithSpecsService = async (id) => {
    try {
        const vehicle = await db_1.db.select()
            .from(schema_1.vehiclesTable)
            .leftJoin(schema_1.vehicleSpecificationTable, (0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehiclespec_id, schema_1.vehicleSpecificationTable.vehiclespec_id))
            .where((0, drizzle_orm_1.eq)(schema_1.vehiclesTable.vehicle_id, id))
            .execute();
        return vehicle[0];
    }
    catch (error) {
        console.error('Error fetching vehicle with specs:', error);
        throw error;
    }
};
exports.vehicleByIdWithSpecsService = vehicleByIdWithSpecsService;
