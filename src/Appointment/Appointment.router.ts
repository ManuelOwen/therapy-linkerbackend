import { Hono } from "hono";
import { getAppointments, getAppointment, createAppointment, updateAppointment, deleteAppointment, getAppointmentByUserId, listAppointments } from "./Appointment.controller";
import { adminRoleAuth } from "../middlewares/bearAuth";
import convertDateFields from "../utils/DateUtils"; // Import the convertDateFields function

export const appointmentRouter = new Hono();

// GET ALL appiontmentS
appointmentRouter.get("/appointment", listAppointments);
//get a single appointment
appointmentRouter.get("/appointment/:id", getAppointment);
//create appointment
appointmentRouter.post('/appointment', createAppointment);
//update appointment
appointmentRouter.put("/appointment/:id", updateAppointment)
//delete appointment
appointmentRouter.delete("/appointment/:id", deleteAppointment)
// get appointments by user id
appointmentRouter.get("/appointment-user/:id", getAppointmentByUserId);
