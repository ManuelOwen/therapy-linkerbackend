"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentByUserId = exports.deleteAppointment = exports.updateAppointment = exports.createAppointment = exports.getAppointment = exports.getAppointments = exports.listAppointments = void 0;
const Appointment_service_1 = require("./Appointment.service");
//get all appointments
const listAppointments = async (c) => {
    try {
        //limit the number of appointments to be returned
        // const limit = Number(c.req.query('limit'))
        const data = await (0, Appointment_service_1.appointmentService)();
        if (data == null || data.length == 0) {
            return c.text("Appointment not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listAppointments = listAppointments;
const getAppointments = async (c) => {
    try {
        const data = await (0, Appointment_service_1.appointmentService)();
        return c.json(data);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
};
exports.getAppointments = getAppointments;
//get appointment by id
const getAppointment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const appointment = await (0, Appointment_service_1.getAppointmentService)(id);
    if (appointment == undefined) {
        return c.text("appointment not found", 404);
    }
    return c.json(appointment, 200);
};
exports.getAppointment = getAppointment;
//create appointment
const createAppointment = async (c) => {
    try {
        const appointment = await c.req.json();
        // Safely parse dates
        if (appointment.appointment_date) {
            const parsedDate = new Date(appointment.appointment_date);
            if (isNaN(parsedDate.getTime())) {
                return c.text("Invalid appointment_date", 400);
            }
            appointment.appointment_date = parsedDate;
        }
        console.log(appointment);
        if (appointment.return_date) {
            const parsedReturnDate = new Date(appointment.return_date);
            if (isNaN(parsedReturnDate.getTime())) {
                return c.text("Invalid return_date", 400);
            }
            appointment.return_date = parsedReturnDate;
        }
        const createdAppointment = await (0, Appointment_service_1.createAppointmentService)(appointment);
        if (!createdAppointment)
            return c.text("Appointment not created", 404);
        return c.json({ msg: createdAppointment }, 201);
    }
    catch (error) {
        console.log(error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.createAppointment = createAppointment;
//update appointment
const updateAppointment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const appointment = await c.req.json();
    // Ensure date fields are converted properly before updating
    if (appointment.appointment_date) {
        const parsedDate = new Date(appointment.appointment_date);
        if (isNaN(parsedDate.getTime())) {
            return c.text("Invalid appointment_date format", 400);
        }
        appointment.appointment_date = parsedDate;
    }
    if (appointment.return_date) {
        const parsedReturnDate = new Date(appointment.return_date);
        if (isNaN(parsedReturnDate.getTime())) {
            return c.text("Invalid return_date format", 400);
        }
        appointment.return_date = parsedReturnDate;
    }
    try {
        const searchedAppointment = await (0, Appointment_service_1.getAppointmentService)(id);
        if (!searchedAppointment)
            return c.text("Appointment not found", 404);
        const res = await (0, Appointment_service_1.updateAppointmentService)(id, appointment);
        if (!res)
            return c.text("Appointment not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateAppointment = updateAppointment;
//delete appointment
const deleteAppointment = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the appointment
        const appointment = await (0, Appointment_service_1.getAppointmentService)(id);
        if (appointment == undefined)
            return c.text("appointment not found", 404);
        //deleting the appointment
        const res = await (0, Appointment_service_1.deleteAppointmentService)(id);
        if (!res)
            return c.text("appointment not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteAppointment = deleteAppointment;
//get appointment by user id
const getAppointmentByUserId = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const appointment = await (0, Appointment_service_1.getAppointmentByUserIdService)(id);
        if (appointment == undefined)
            return c.text("appointment not found", 404);
        return c.json(appointment, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getAppointmentByUserId = getAppointmentByUserId;
