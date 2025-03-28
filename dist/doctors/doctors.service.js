"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDoctorService = exports.updateDoctorService = exports.createDoctorService = exports.getDoctorbyIdService = exports.doctorsService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const doctorsService = async () => {
    return await db_1.db.query.doctorsTable.findMany();
};
exports.doctorsService = doctorsService;
const getDoctorbyIdService = async (id) => {
    return await db_1.db.query.doctorsTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.doctorsTable.id, id)
    });
};
exports.getDoctorbyIdService = getDoctorbyIdService;
const createDoctorService = async (doctor) => {
    await db_1.db.insert(schema_1.doctorsTable).values(doctor);
    // .returning({id:doctorsTable.doctor_id}
    return "doctor created successfully ";
};
exports.createDoctorService = createDoctorService;
const updateDoctorService = async (id, doctor) => {
    await db_1.db.update(schema_1.doctorsTable).set(doctor).where((0, drizzle_orm_1.eq)(schema_1.doctorsTable.id, id));
    return "doctor updated successfully ";
};
exports.updateDoctorService = updateDoctorService;
const deleteDoctorService = async (id) => {
    await db_1.db.delete(schema_1.doctorsTable).where((0, drizzle_orm_1.eq)(schema_1.doctorsTable.id, id));
    return "doctor deleted successfully ";
};
exports.deleteDoctorService = deleteDoctorService;
