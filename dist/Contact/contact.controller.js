"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContact = exports.updateContact = exports.createContact = exports.getContact = exports.listContacts = void 0;
const contactservice_1 = require("./contactservice");
//list contactService
const listContacts = async (c) => {
    try {
        const data = await (0, contactservice_1.contactService)();
        if (contactservice_1.contactService == null)
            return c.text("No contactService found ", 404);
        return c.json(contactservice_1.contactService, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.listContacts = listContacts;
//get contactService by id
const getContact = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for contactService
        const contactService = await (0, contactservice_1.getContactbyIdService)(id);
        if (contactService == undefined)
            return c.text("contactService not found ", 404);
        return c.json(contactService, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.getContact = getContact;
//insert contactService
const createContact = async (c) => {
    // return c.text("Not implemented yet",501)
    try {
        const contactService = await c.req.json();
        const createdcontactService = await (0, contactservice_1.insertContactService)(contactService);
        if (!createdcontactService) {
            return c.text("contactService not created ", 400);
        }
        return c.json(contactService, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.createContact = createContact;
//update contactService
const updateContact = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const contactService = await c.req.json();
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for contactService
        const existingcontactService = await (0, contactservice_1.getContactbyIdService)(id);
        if (existingcontactService == undefined)
            return c.text("contactService not found ", 404);
        //update contactService
        const updatedcontactService = await (0, contactservice_1.updateContactService)(id, contactService);
        return c.json({ msg: updatedcontactService }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.updateContact = updateContact;
//delete contactService
const deleteContact = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for contactService
        const existingContactService = await (0, contactservice_1.getContactbyIdService)(id);
        if (existingContactService == undefined)
            return c.text("contactService not found ", 404);
        //delete contactService
        const res = await (0, contactservice_1.deleteContactService)(id);
        return c.json({ msg: contactservice_1.deleteContactService }, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.deleteContact = deleteContact;
