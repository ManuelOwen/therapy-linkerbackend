"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingByUserId = exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.getBookings = exports.listBookings = void 0;
const Booking_service_1 = require("./Booking.service");
const listBookings = async (c) => {
    try {
        //limit the number of Bookings to be returned
        // const limit = Number(c.req.query('limit'))
        const data = await (0, Booking_service_1.bookingService)();
        if (data == null || data.length == 0) {
            return c.text("Booking not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listBookings = listBookings;
const getBookings = async (c) => {
    try {
        const data = await (0, Booking_service_1.bookingService)();
        return c.json(data);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
};
exports.getBookings = getBookings;
//get Booking by id
const getBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Booking = await (0, Booking_service_1.getBookingService)(id);
    if (Booking == undefined) {
        return c.text("Booking not found", 404);
    }
    return c.json(Booking, 200);
};
exports.getBooking = getBooking;
//create Booking
const createBooking = async (c) => {
    try {
        const Booking = await c.req.json();
        if (Booking.booking_date) {
            Booking.booking_date = new Date(Booking.booking_date);
        }
        if (Booking.return_date) {
            Booking.return_date = new Date(Booking.return_date);
        }
        const createdBooking = await (0, Booking_service_1.createBookingService)(Booking);
        if (!createdBooking)
            return c.text("Booking not created", 404);
        return c.json({ msg: createdBooking }, 201);
        console.log("msg");
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createBooking = createBooking;
//update Booking
const updateBooking = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const Booking = await c.req.json();
    try {
        // search for the Booking
        const searchedBooking = await (0, Booking_service_1.getBookingService)(id);
        if (searchedBooking == undefined)
            return c.text("Booking not found", 404);
        // get the data and update it
        const res = await (0, Booking_service_1.updateBookingService)(id, Booking);
        // return a success message
        if (!res)
            return c.text("Booking not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateBooking = updateBooking;
//delete Booking
const deleteBooking = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the Booking
        const Booking = await (0, Booking_service_1.getBookingService)(id);
        if (Booking == undefined)
            return c.text("Booking not found", 404);
        //deleting the Booking
        const res = await (0, Booking_service_1.deleteBookingService)(id);
        if (!res)
            return c.text("Booking not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteBooking = deleteBooking;
//get Booking by user id
const getBookingByUserId = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const Booking = await (0, Booking_service_1.getBookingByUserIdService)(id);
        if (Booking == undefined)
            return c.text("Booking not found", 404);
        return c.json(Booking, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.getBookingByUserId = getBookingByUserId;
