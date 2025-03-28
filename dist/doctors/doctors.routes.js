"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorsRouter = void 0;
const hono_1 = require("hono");
const doctors_controller_1 = require("./doctors.controller");
exports.doctorsRouter = new hono_1.Hono();
//get all Doctors
exports.doctorsRouter.get('/doctor', doctors_controller_1.listDoctors);
//get doctor by id
exports.doctorsRouter.get('/doctor/:id', doctors_controller_1.GetDoctor);
//insert doctor
exports.doctorsRouter.post('/doctor', doctors_controller_1.createDoctor);
//update doctor
exports.doctorsRouter.put('/doctor/:id', doctors_controller_1.updateDoctor);
//delete doctor
exports.doctorsRouter.delete('/doctor/:id', doctors_controller_1.deleteDoctor);
