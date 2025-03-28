"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehicleSpecificationRouter = void 0;
const hono_1 = require("hono");
const vehicleSpecification_controller_1 = require("./vehicleSpecification.controller");
exports.vehicleSpecificationRouter = new hono_1.Hono();
// GET ALL vehicleSpecifications
exports.vehicleSpecificationRouter.get("/vehiclespecs", vehicleSpecification_controller_1.listVehicleSpecifications);
//grt a single vehicleSpecification
exports.vehicleSpecificationRouter.get("/vehiclespecs/:id", vehicleSpecification_controller_1.getVehicleSpecification);
//create vehicleSpecification
exports.vehicleSpecificationRouter.post("/vehiclespecs", vehicleSpecification_controller_1.createVehicleSpecification);
//update vehicleSpecification
exports.vehicleSpecificationRouter.put("/vehiclespecs/:id", vehicleSpecification_controller_1.updatevehicleSpecification);
//delete vehicleSpecification
exports.vehicleSpecificationRouter.delete("/vehiclespecs/:id", vehicleSpecification_controller_1.deletevehicleSpecification);
