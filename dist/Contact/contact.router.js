"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRouter = void 0;
const hono_1 = require("hono");
const contact_controller_1 = require("./contact.controller");
const bearAuth_1 = require("../middlewares/bearAuth");
exports.contactRouter = new hono_1.Hono();
//get all contacts
exports.contactRouter.get('/contact', bearAuth_1.adminRoleAuth, contact_controller_1.listContacts);
//get contact by id
exports.contactRouter.get('/contact/:id', bearAuth_1.adminRoleAuth, contact_controller_1.getContact);
//insert contact
exports.contactRouter.post('/contact', bearAuth_1.adminRoleAuth, contact_controller_1.createContact);
//update contact
exports.contactRouter.put('/contact/:id', bearAuth_1.adminRoleAuth, contact_controller_1.updateContact);
//delete contact
exports.contactRouter.delete('/customerSupport/:id', bearAuth_1.adminRoleAuth, contact_controller_1.deleteContact);
