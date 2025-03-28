"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVehicleByIdWithSpecs = exports.getVehicleWithSpecification = exports.deleteVehicle = exports.updateVehicle = exports.createVehicle = exports.getVehicle = exports.listVehicles = void 0;
const vehicles_service_1 = require("./vehicles.service");
// list vehicles
const listVehicles = async (c) => {
    try {
        const vehicles = await (0, vehicles_service_1.vehicleService)();
        if (vehicles == null)
            return c.text("No vehicle found ", 404);
        return c.json(vehicles, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.listVehicles = listVehicles;
// get a single vehicle
const getVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicles = await (0, vehicles_service_1.getVehicleService)(id);
    if (vehicles == undefined) {
        return c.text("vehicle not found", 404);
    }
    return c.json(vehicles, 200);
};
exports.getVehicle = getVehicle;
//create vehicle
const createVehicle = async (c) => {
    try {
        const vehicle = await c.req.json();
        const createdvehicle = await (0, vehicles_service_1.createVehicleService)(vehicle);
        if (!createdvehicle)
            return c.text("vehicle not created", 404);
        return c.json({ msg: createdvehicle }, 201);
        console.log("msg");
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicle = createVehicle;
//update vehicle
const updateVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicle = await c.req.json();
    const updatedvehicle = await (0, vehicles_service_1.updateVehicleService)(id, vehicle);
    if (!updatedvehicle)
        return c.text("vehicle not updated", 404);
    return c.json({ msg: updatedvehicle }, 200);
};
exports.updateVehicle = updateVehicle;
//delete vehicle
const deleteVehicle = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const deletedvehicle = await (0, vehicles_service_1.deleteVehicleService)(id);
    if (!deletedvehicle)
        return c.text("vehicle not deleted", 404);
    return c.json({ msg: deletedvehicle }, 200);
};
exports.deleteVehicle = deleteVehicle;
// get vehicles with its specific vehicle spec
const getVehicleWithSpecification = async (c) => {
    try {
        const vehiclespecification = await (0, vehicles_service_1.getVehicleWithSpecificationsService)();
        if (vehiclespecification === null)
            return c.text("vehicle with specs not found", 404);
        return c.json(vehiclespecification, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getVehicleWithSpecification = getVehicleWithSpecification;
const getVehicleByIdWithSpecs = async (c) => {
    const id = parseInt(c.req.param('id'));
    if (isNaN(id)) {
        return c.json({ error: 'Invalid vehicle ID' }, 400);
    }
    try {
        const vehicle = await (0, vehicles_service_1.vehicleByIdWithSpecsService)(id);
        if (!vehicle) {
            return c.json({ msg: 'Vehicle not found' }, 404);
        }
        return c.json(vehicle, 200);
    }
    catch (error) {
        return c.json({ msg: 'Failed to fetch vehicle' }, 500);
    }
};
exports.getVehicleByIdWithSpecs = getVehicleByIdWithSpecs;
