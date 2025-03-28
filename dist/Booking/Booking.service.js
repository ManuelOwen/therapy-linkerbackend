"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingByUserIdService = exports.deleteBookingService = exports.updateBookingService = exports.createBookingService = exports.getBookingService = exports.bookingService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const bookingService = async () => {
    return await db_1.db.query.bookingTable.findMany();
    return await db_1.db.query.bookingTable.findMany();
};
exports.bookingService = bookingService;
const getBookingService = async (id) => {
    return await db_1.db.query.bookingTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id)
    });
};
exports.getBookingService = getBookingService;
const createBookingService = async (user) => {
    await db_1.db.insert(schema_1.bookingTable).values(user);
    return "Booking created successfully";
};
exports.createBookingService = createBookingService;
const updateBookingService = async (id, user) => {
    await db_1.db.update(schema_1.bookingTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id));
    return "Booking updated successfully";
};
exports.updateBookingService = updateBookingService;
const deleteBookingService = async (id) => {
    await db_1.db.delete(schema_1.bookingTable).where((0, drizzle_orm_1.eq)(schema_1.bookingTable.id, id));
    return "Booking deleted successfully";
};
exports.deleteBookingService = deleteBookingService;
// get bookings by user id
const getBookingByUserIdService = async (id) => {
    return await db_1.db.query.bookingTable.findMany({
        where: (0, drizzle_orm_1.eq)(schema_1.bookingTable.user_id, id)
    });
};
exports.getBookingByUserIdService = getBookingByUserIdService;
