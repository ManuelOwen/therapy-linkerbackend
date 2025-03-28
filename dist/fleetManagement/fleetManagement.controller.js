"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFleetManagement = exports.updateFleetManagement = exports.createFleetManagement = exports.getFleetManagement = exports.getFleetManagements = exports.listFleetManagements = void 0;
const fleetManagement_service_1 = require("./fleetManagement.service");
const listFleetManagements = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, fleetManagement_service_1.fleetManagementService)(limit);
        if (data == null || data.length == 0) {
            return c.text("d not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listFleetManagements = listFleetManagements;
const getFleetManagements = async (c) => {
    try {
        const data = await (0, fleetManagement_service_1.fleetManagementService)();
        return c.json(data);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
};
exports.getFleetManagements = getFleetManagements;
const getFleetManagement = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const d = await (0, fleetManagement_service_1.getfleetManagementService)(id);
    if (d == undefined) {
        return c.text("d not found", 404);
    }
    return c.json(d, 200);
};
exports.getFleetManagement = getFleetManagement;
//create d
const createFleetManagement = async (c) => {
    try {
        const fleetManagement = await c.req.json();
        const createdfleetManagement = await (0, fleetManagement_service_1.createfleetManagementService)(fleetManagement);
        if (!createdfleetManagement)
            return c.text("fleetManagement not created", 404);
        return c.json({ msg: createdfleetManagement }, 201);
        console.log("msg");
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createFleetManagement = createFleetManagement;
//update d
const updateFleetManagement = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const d = await c.req.json();
    try {
        // search for the d
        const searchedd = await (0, fleetManagement_service_1.getfleetManagementService)(id);
        if (searchedd == undefined)
            return c.text("fleetManagement not found", 404);
        // get the data and update it
        const res = await (0, fleetManagement_service_1.updatefleetManagementService)(id, d);
        // return a success message
        if (!res)
            return c.text("fleetManagement not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateFleetManagement = updateFleetManagement;
//delete fleetManagement
const deleteFleetManagement = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const fleetManagement = await (0, fleetManagement_service_1.getfleetManagementService)(id);
        if (fleetManagement == undefined)
            return c.text("fleetManagement not found", 404);
        const res = await (0, fleetManagement_service_1.deletefleetManagementService)(id);
        if (!res)
            return c.text("fleetManagement not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteFleetManagement = deleteFleetManagement;
