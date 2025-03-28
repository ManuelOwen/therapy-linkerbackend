"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctor = exports.updateDoctor = exports.createDoctor = exports.GetDoctor = exports.listDoctors = void 0;
const doctors_service_1 = require("./doctors.service");
//list doctorService
const listDoctors = async (c) => {
    try {
        const data = await (0, doctors_service_1.doctorsService)();
        if (doctors_service_1.doctorsService == null)
            return c.text("No doctors found ", 404);
        return c.json(data, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.listDoctors = listDoctors;
//get doctorService by id
const GetDoctor = async (c) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try {
        if (isNaN(id))
            return c.text("Invalid ID ", 400);
        //search for doctorService
        const data = await (0, doctors_service_1.getDoctorbyIdService)(id);
        if (data == undefined)
            return c.text("doctorService not found ", 404);
        return c.json(data, 200);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.GetDoctor = GetDoctor;
//insert doctorService
const createDoctor = async (c) => {
    // return c.text("Not implemented yet",501)
    try {
        const doctor = await c.req.json();
        const createdDoctor = await (0, doctors_service_1.createDoctorService)(doctor);
        if (!createdDoctor) {
            return c.text("doctor not created ", 400);
        }
        return c.json({ msg: createdDoctor }, 201);
    }
    catch (error) {
        return c.text(error?.message, 400);
    }
};
exports.createDoctor = createDoctor;
//update doctorService
const updateDoctor = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const doctor = await c.req.json();
    const updatedDoctor = await (0, doctors_service_1.updateDoctorService)(id, doctor);
    if (!updatedDoctor)
        return c.text("doctor not updated", 404);
    return c.json({ msg: updatedDoctor }, 200);
};
exports.updateDoctor = updateDoctor;
//delete vehicle
const deleteDoctor = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const deletedDoctor = await (0, doctors_service_1.deleteDoctorService)(id);
    if (!deletedDoctor)
        return c.text("doctor not deleted", 404);
    return c.json({ msg: deletedDoctor }, 200);
};
exports.deleteDoctor = deleteDoctor;
