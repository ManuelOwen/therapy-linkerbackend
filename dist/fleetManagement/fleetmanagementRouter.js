"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fleetManagementRouter = void 0;
const hono_1 = require("hono");
const fleetManagement_controller_1 = require("./fleetManagement.controller");
const bearAuth_1 = require("../middlewares/bearAuth");
const DateUtils_1 = __importDefault(require("../utils/DateUtils"));
exports.fleetManagementRouter = new hono_1.Hono();
// GET ALL fleet
exports.fleetManagementRouter.get("/fleet", bearAuth_1.adminRoleAuth, fleetManagement_controller_1.getFleetManagements);
//grt a single fleet
exports.fleetManagementRouter.get("/fleet/:id", bearAuth_1.adminRoleAuth, fleetManagement_controller_1.getFleetManagement);
//create fleet
exports.fleetManagementRouter.post("/fleet", bearAuth_1.adminRoleAuth, async (c) => {
    const body = await c.req.json();
    (0, DateUtils_1.default)(body, ['acquisition_date', 'return_date', 'createdAt', 'updatedAt']);
    return c.json({ message: 'Booking created successfully' });
});
//update fleet
exports.fleetManagementRouter.put("/fleet/:id", bearAuth_1.adminRoleAuth, async (c) => {
    const body = await c.req.json();
    (0, DateUtils_1.default)(body, ['acquisition_date', 'return_date', 'createdAt', 'updatedAt']);
    return c.json({ message: 'Booking updated successfully' });
});
//delete fleet
exports.fleetManagementRouter.delete("/fleet/:id", bearAuth_1.adminRoleAuth, fleetManagement_controller_1.deleteFleetManagement);
