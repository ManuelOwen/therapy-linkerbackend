"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCustomerSupport = exports.updateCustomerSupport = exports.createcustomerSupport = exports.getCustomerSupport = exports.listCustomerSupports = void 0;
const customerSupport_service_1 = require("./customerSupport.service");
//list customerSupport
const listCustomerSupports = async (c) => {
    try {
        const customerSupport = await (0, customerSupport_service_1.customerSupportService)();
        if (customerSupport == null)
            return c.text("No customerSupport found ", 404);
        return c.json(customerSupport, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.listCustomerSupports = listCustomerSupports;
//get customerSupport by id
const getCustomerSupport = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for customerSupport
        const customerSupport = await (0, customerSupport_service_1.getCustomerSupportbyIdService)(id);
        if (customerSupport == undefined)
            return c.text("customerSupport not found ", 404);
        return c.json(customerSupport, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getCustomerSupport = getCustomerSupport;
//insert customerSupport
const createcustomerSupport = async (c) => {
    // return c.text("Not implemented yet",501)
    try {
        const customerSupport = await c.req.json();
        const createdcustomerSupport = await (0, customerSupport_service_1.insertcustomerSupportService)(customerSupport);
        if (!createdcustomerSupport) {
            return c.text("customerSupport not created ", 400);
        }
        return c.json(customerSupport, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.createcustomerSupport = createcustomerSupport;
//update customerSupport
const updateCustomerSupport = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const customerSupport = await c.req.json();
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for customerSupport
        const existingcustomerSupport = await (0, customerSupport_service_1.getCustomerSupportbyIdService)(id);
        if (existingcustomerSupport == undefined)
            return c.text("customerSupport not found ", 404);
        //update customerSupport
        const updatedcustomerSupport = await (0, customerSupport_service_1.updatecustomerSupportService)(id, customerSupport);
        return c.json({ msg: updatedcustomerSupport }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateCustomerSupport = updateCustomerSupport;
//delete customerSupport
const deleteCustomerSupport = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for customerSupport
        const existingCustomerSupport = await (0, customerSupport_service_1.getCustomerSupportbyIdService)(id);
        if (existingCustomerSupport == undefined)
            return c.text("customerSupport not found ", 404);
        //delete customerSupport
        const deleteCustomerSupport = await (0, customerSupport_service_1.deletecustomerSupportService)(id);
        return c.json({ msg: deleteCustomerSupport }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteCustomerSupport = deleteCustomerSupport;
