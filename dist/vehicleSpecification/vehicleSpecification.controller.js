"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletevehicleSpecification = exports.updatevehicleSpecification = exports.createVehicleSpecification = exports.getVehicleSpecification = exports.getVehicleSpecificationService = exports.listVehicleSpecifications = void 0;
const vehicleSpecification_service_1 = require("./vehicleSpecification.service");
const listVehicleSpecifications = async (c) => {
    try {
        //limit the number of ds to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, vehicleSpecification_service_1.vehicleSpecificationService)(limit);
        if (data == null || data.length == 0) {
            return c.text("vehicle specification not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listVehicleSpecifications = listVehicleSpecifications;
const getVehicleSpecificationService = async (c) => {
    try {
        const data = await (0, vehicleSpecification_service_1.vehicleSpecificationService)();
        return c.json(data);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
};
exports.getVehicleSpecificationService = getVehicleSpecificationService;
const getVehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const vehicleSpecification = await (0, vehicleSpecification_service_1.getVehicleSpecificationByIdService)(id);
    if (vehicleSpecification == undefined) {
        return c.text("vehicle specification not found", 404);
    }
    return c.json(vehicleSpecification, 200);
};
exports.getVehicleSpecification = getVehicleSpecification;
//create createvehicleSpecification
const createVehicleSpecification = async (c) => {
    try {
        const menu_item = await c.req.json();
        const createdmenu_item = await (0, vehicleSpecification_service_1.createVehicleSpecificationService)(menu_item);
        if (!createdmenu_item)
            return c.text("menu_item not created", 404);
        return c.json({ msg: createdmenu_item }, 201);
        console.log("msg");
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createVehicleSpecification = createVehicleSpecification;
//update vehicleSpecification
const updatevehicleSpecification = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const d = await c.req.json();
    try {
        const searchedd = await (0, vehicleSpecification_service_1.updateVehicleSpecificationService)(id, d);
        if (searchedd == undefined)
            return c.text("menu_item not found", 404);
        const res = await (0, vehicleSpecification_service_1.updateVehicleSpecificationService)(id, d);
        if (!res)
            return c.text("vehicle spec not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updatevehicleSpecification = updatevehicleSpecification;
//delete menu_item
const deletevehicleSpecification = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const deletevehicleSpecification = await (0, vehicleSpecification_service_1.deleteVehicleSpecificationService)(id);
        if (deletevehicleSpecification == undefined)
            return c.text("vehiclespec not found", 404);
        const res = await (0, vehicleSpecification_service_1.deleteVehicleSpecificationService)(id);
        if (!res)
            return c.text("vehicle spec not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deletevehicleSpecification = deletevehicleSpecification;
