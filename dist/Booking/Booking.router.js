"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRouter = void 0;
const hono_1 = require("hono");
const Booking_controller_1 = require("./Booking.controller");
exports.BookingRouter = new hono_1.Hono();
// GET ALL BOOKINGS
exports.BookingRouter.get("/booking", Booking_controller_1.listBookings);
//get a single booking
exports.BookingRouter.get("/booking/:id", Booking_controller_1.getBooking);
//create booking
exports.BookingRouter.post('/booking', Booking_controller_1.createBooking);
//update booking
exports.BookingRouter.put("/booking/:id", Booking_controller_1.updateBooking);
//delete booking
exports.BookingRouter.delete("/booking/:id", Booking_controller_1.deleteBooking);
// get bookings by user id
exports.BookingRouter.get("/booking-user/:id", Booking_controller_1.getBookingByUserId);
