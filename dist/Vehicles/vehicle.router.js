"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleRouter = void 0;
const hono_1 = require("hono");
const vehicles_controller_1 = require("./vehicles.controller");
exports.vehicleRouter = new hono_1.Hono();
// GET ALL vehicles
exports.vehicleRouter.get("/vehicles/:id", vehicles_controller_1.getVehicle);
//get a single vehicle
exports.vehicleRouter.get("/vehicles", vehicles_controller_1.listVehicles);
//create vehicle
exports.vehicleRouter.post("/vehicles", vehicles_controller_1.createVehicle);
//update vehicle
exports.vehicleRouter.put("/vehicles/:id", vehicles_controller_1.updateVehicle);
//delete vehicle
exports.vehicleRouter.delete("/vehicles/:id", vehicles_controller_1.deleteVehicle);
// gettting all vehicles with specific vehicle spec
exports.vehicleRouter.get("/vehicles-vehiclespecs", vehicles_controller_1.getVehicleWithSpecification);
// getVehicleByIdWithSpecs
exports.vehicleRouter.get("/vehicle-with-specs/:id", vehicles_controller_1.getVehicleByIdWithSpecs);
