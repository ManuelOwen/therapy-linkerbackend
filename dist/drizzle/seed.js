"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedback = exports.doctors = exports.department = exports.contact = exports.appointment = exports.users = void 0;
exports.seed = seed;
const db_1 = require("./db");
const schema_1 = require("./schema");
// 1. User Table
exports.users = [
    {
        full_name: "John Doe",
        email: "johndoe1@gmail.com",
        password: "12345",
        contact_phone: "08012345678",
        role: "admin"
    },
    {
        full_name: "Jane Doe",
        email: "janedoe1@gmail.com",
        password: "12345",
        contact_phone: "08012345678",
        role: "user"
    }
];
// 2. Appointment Table
exports.appointment = [
    {
        id: 1,
        user_id: 1,
        appointment_date: new Date(),
        return_date: new Date(),
        total_amount: 5000,
        appointment_status: "pending"
    },
    {
        id: 2,
        user_id: 2,
        appointment_date: new Date(),
        return_date: new Date(),
        total_amount: 5000,
        appointment_status: "approved"
    }
];
// 3. Contact Table
exports.contact = [
    {
        id: 1,
        user_id: 1,
        message: "Hello"
    },
    {
        id: 2,
        user_id: 2,
        message: "Hello"
    }
];
// 4. Department Table
exports.department = [
    {
        id: 1,
        department_name: "Cardiology",
        description: "Cardiology is a medical specialty and a branch of internal medicine concerned with disorders of the heart."
    },
    {
        id: 2,
        department_name: "Dermatology",
        description: "Dermatology is the branch of medicine dealing with the skin, nails, hair and its diseases."
    }
];
// 5. Doctors Table
exports.doctors = [
    {
        name: "Dr. John Doe",
        position: "Cardiologist",
        description: "Dr. John Doe is a Cardiologist at Cardiology Department.",
        department_id: 1
    },
    {
        name: "Dr. Jane Doe",
        position: "Dermatologist",
        description: "Dr. Jane Doe is a Dermatologist at Dermatology Department.",
        department_id: 2
    }
];
// 6. Feedback Table
exports.feedback = [
    {
        id: 1,
        user_id: 1,
        feedback_message: "Good service"
    },
    {
        id: 2,
        user_id: 2,
        feedback_message: "Good service"
    }
];
async function seed() {
    await db_1.db.insert(schema_1.userTable).values(exports.users);
    //await db.insert(appointmentTable).values(appointment);
    await db_1.db.insert(schema_1.contactTable).values(exports.contact);
    await db_1.db.insert(schema_1.departmentTable).values(exports.department);
    await db_1.db.insert(schema_1.doctorsTable).values(exports.doctors);
    await db_1.db.insert(schema_1.feedbackTable).values(exports.feedback);
}
seed().then(() => console.log("Seeding complete")).catch(console.error);
