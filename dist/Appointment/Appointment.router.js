"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appointmentRouter = void 0;
const hono_1 = require("hono");
const Appointment_controller_1 = require("./Appointment.controller");
exports.appointmentRouter = new hono_1.Hono();
// GET ALL appiontmentS
exports.appointmentRouter.get("/appointment", Appointment_controller_1.listAppointments);
//get a single appointment
exports.appointmentRouter.get("/appointment/:id", Appointment_controller_1.getAppointment);
//create appointment
exports.appointmentRouter.post('/appointment', Appointment_controller_1.createAppointment);
//update appointment
exports.appointmentRouter.put("/appointment/:id", Appointment_controller_1.updateAppointment);
//delete appointment
exports.appointmentRouter.delete("/appointment/:id", Appointment_controller_1.deleteAppointment);
// get appointments by user id
exports.appointmentRouter.get("/appointment-user/:id", Appointment_controller_1.getAppointmentByUserId);
