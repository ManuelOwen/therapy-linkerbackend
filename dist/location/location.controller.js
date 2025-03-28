"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocationWithBranch = exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.getLocationById = exports.listLocations = void 0;
const location_service_1 = require("./location.service");
//list locations
const listLocations = async (c) => {
    try {
        const locations = await (0, location_service_1.locationService)();
        if (locations == null)
            return c.text("No location found ", 404);
        return c.json(locations, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.listLocations = listLocations;
//get order locations by id
const getLocationById = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for location
        const location = await (0, location_service_1.getLocationService)(id);
        if (location == undefined)
            return c.text("location not found ", 404);
        return c.json(location, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getLocationById = getLocationById;
//insert location
const createLocation = async (c) => {
    // return c.text("Not implemented yet",501)
    try {
        const location = await c.req.json();
        const createdlocation = await (0, location_service_1.insertLocationService)(location);
        if (!createdlocation) {
            return c.text("location not created ", 400);
        }
        return c.json(location, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.createLocation = createLocation;
//update location
const updateLocation = async (c) => {
    const id = Number(c.req.param("id"));
    const location = await c.req.json();
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for location
        const existingLocation = await (0, location_service_1.getLocationService)(id);
        if (existingLocation == undefined)
            return c.text("location not found ", 404);
        //update location
        const updatedLocation = await (0, location_service_1.updateLocationService)(id, location); // Pass the missing argument 'location'
        return c.json({ msg: updatedLocation }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateLocation = updateLocation;
//delete location
const deleteLocation = async (c) => {
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for location
        const existingLocation = await (0, location_service_1.getLocationService)(id);
        if (existingLocation == undefined)
            return c.text("location not found ", 404);
        //delete location
        const deletedLocation = await (0, location_service_1.deleteLocationService)(id);
        return c.json({ msg: deletedLocation }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
        console.log(error?.message);
    }
};
exports.deleteLocation = deleteLocation;
// get location with branch
const getLocationWithBranch = async (c) => {
    try {
        const branch = await (0, location_service_1.getLocationWithBranchService)();
        if (branch === null)
            return c.text("vehicle with specs not found", 404);
        return c.json(branch, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getLocationWithBranch = getLocationWithBranch;
