"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.locationRouter = void 0;
const hono_1 = require("hono");
const location_controller_1 = require("./location.controller");
const bearAuth_1 = require("../middlewares/bearAuth");
exports.locationRouter = new hono_1.Hono();
//location routes
exports.locationRouter.get("/locations", location_controller_1.listLocations);
//get a single location
exports.locationRouter.get("/locations/:id", location_controller_1.getLocationById);
//insert    location
exports.locationRouter.post("/locations", bearAuth_1.adminRoleAuth, location_controller_1.createLocation);
//update    location
exports.locationRouter.put("/locations/:id", bearAuth_1.adminRoleAuth, location_controller_1.updateLocation);
//delete   location
exports.locationRouter.delete("/locations/:id", bearAuth_1.adminRoleAuth, location_controller_1.deleteLocation);
// get location with branch
exports.locationRouter.get("/locations-branch", bearAuth_1.adminRoleAuth, location_controller_1.getLocationWithBranch);
