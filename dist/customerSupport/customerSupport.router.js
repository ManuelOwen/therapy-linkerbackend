"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.customerSupportRouter = void 0;
const hono_1 = require("hono");
const customerSupport_controller_1 = require("./customerSupport.controller");
const bearAuth_1 = require("../middlewares/bearAuth");
exports.customerSupportRouter = new hono_1.Hono();
//get all customerSupport
exports.customerSupportRouter.get('/customerSupport', bearAuth_1.adminRoleAuth, customerSupport_controller_1.listCustomerSupports);
//get customerSupport by id
exports.customerSupportRouter.get('/customerSupport/:id', bearAuth_1.adminRoleAuth, customerSupport_controller_1.getCustomerSupport);
//insert customerSupport
exports.customerSupportRouter.post('/customerSupport', bearAuth_1.adminRoleAuth, customerSupport_controller_1.createcustomerSupport);
//update customerSupport
exports.customerSupportRouter.put('/customerSupport/:id', bearAuth_1.adminRoleAuth, customerSupport_controller_1.updateCustomerSupport);
//delete customerSupport
exports.customerSupportRouter.delete('/customerSupport/:id', bearAuth_1.adminRoleAuth, customerSupport_controller_1.deleteCustomerSupport);
