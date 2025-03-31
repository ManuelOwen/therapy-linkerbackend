"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppointmentByUserIdService = exports.deleteAppointmentService = exports.updateAppointmentService = exports.createAppointmentService = exports.getAppointmentService = exports.appointmentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const http_1 = __importDefault(require("http"));
const PORT = process.env.PORT || 8000;
if (require.main === module) { // Ensure the server runs only when executed directly
    const server = http_1.default.createServer((req, res) => {
        // ...existing server logic...
    });
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            console.error(`Port ${PORT} is already in use. Please use a different port.`);
            process.exit(1); // Exit the process with an error code
        }
        else {
            throw err; // Re-throw other errors
        }
    });
}
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
        where: (0, drizzle_orm_1.eq)(schema_1.appointmentTable.userId, id)
    });
};
exports.getAppointmentByUserIdService = getAppointmentByUserIdService;
