"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentByUserIdService = exports.deleteAppointmentService = exports.updateAppointmentService = exports.createAppointmentService = exports.getAppointmentService = exports.appointmentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
// getting many appiontments
const appointmentService = async () => {
    return await db_1.db.query.appointmentTable.findMany();
    return await db_1.db.query.appointmentTable.findMany();
};
exports.appointmentService = appointmentService;
//  Getting a single appointment
const getAppointmentService = async (id) => {
    return await db_1.db.query.appointmentTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.appointmentTable.id, id)
    });
};
exports.getAppointmentService = getAppointmentService;
// creating an appointment
const createAppointmentService = async (user) => {
    await db_1.db.insert(schema_1.appointmentTable).values(user);
    return "Booking created successfully";
};
exports.createAppointmentService = createAppointmentService;
//  update Appointment
const updateAppointmentService = async (id, user) => {
    await db_1.db.update(schema_1.appointmentTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.appointmentTable.id, id));
    return "Booking updated successfully";
};
exports.updateAppointmentService = updateAppointmentService;
// delete Appointment
const deleteAppointmentService = async (id) => {
    await db_1.db.delete(schema_1.appointmentTable).where((0, drizzle_orm_1.eq)(schema_1.appointmentTable.id, id));
    return "Booking deleted successfully";
};
exports.deleteAppointmentService = deleteAppointmentService;
// get bookings by user id
const getAppointmentByUserIdService = async (id) => {
    return await db_1.db.query.appointmentTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.appointmentTable.user_id, id)
    });
};
exports.getAppointmentByUserIdService = getAppointmentByUserIdService;
