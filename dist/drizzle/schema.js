"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctor_appointment_relations = exports.department_doctor_relations = exports.doctor_department_relations = exports.user_feedback_relations = exports.user_contact_relations = exports.user_appointment_relations = exports.feedbackTable = exports.departmentTable = exports.doctorsTable = exports.contactTable = exports.appointmentTable = exports.appointmentStatusEnum = exports.userTable = exports.roleEnum = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// 1. User table
exports.roleEnum = (0, pg_core_1.pgEnum)("role", ["admin", "user", "both"]);
exports.userTable = (0, pg_core_1.pgTable)("user", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    full_name: (0, pg_core_1.varchar)("full_name", { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)("email", { length: 255 }).notNull(),
    password: (0, pg_core_1.varchar)("password", { length: 255 }).notNull(),
    contact_phone: (0, pg_core_1.varchar)("contact_phone", { length: 255 }).notNull(),
    role: (0, exports.roleEnum)("role").default("user"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow()
});
// 2. Appointment table
exports.appointmentStatusEnum = (0, pg_core_1.pgEnum)("appontment_status", ["pending", "approved", "rejected", "cancelled"]);
exports.appointmentTable = (0, pg_core_1.pgTable)("appointment", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    appointment_date: (0, pg_core_1.timestamp)("booking_date").notNull(),
    return_date: (0, pg_core_1.timestamp)("return_date").notNull(),
    total_amount: (0, pg_core_1.integer)("total_amount").notNull(),
    appointment_status: (0, exports.appointmentStatusEnum)("appointment_status").default("pending"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow()
});
// 3. Contact table
exports.contactTable = (0, pg_core_1.pgTable)("contact", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    message: (0, pg_core_1.varchar)("subject", { length: 255 }).notNull(),
});
// 4.doctors table
exports.doctorsTable = (0, pg_core_1.pgTable)("doctorTable", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    position: (0, pg_core_1.varchar)("position", { length: 255 }).notNull(),
    description: (0, pg_core_1.varchar)("description", { length: 255 }).notNull(),
    department_id: (0, pg_core_1.integer)("department_id").notNull().references(() => exports.departmentTable.id, { onDelete: "cascade" }),
});
// 5.Department table
exports.departmentTable = (0, pg_core_1.pgTable)("department", {
    id: (0, pg_core_1.serial)("id").notNull().primaryKey(),
    department_name: (0, pg_core_1.varchar)("name", { length: 255 }).notNull(),
    description: (0, pg_core_1.varchar)("address", { length: 255 }).notNull(),
});
// 6. Feedback table
exports.feedbackTable = (0, pg_core_1.pgTable)("feedback", {
    feedback_id: (0, pg_core_1.serial)("feedback_id").primaryKey(),
    user_id: (0, pg_core_1.integer)("user_id").notNull().references(() => exports.userTable.id, { onDelete: "cascade" }),
    feedback_message: (0, pg_core_1.varchar)("feedback_message"),
    createdAt: (0, pg_core_1.timestamp)("created_at").defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)("updated_at").defaultNow(),
});
// Relationships
//  user appointment relationship
exports.user_appointment_relations = (0, drizzle_orm_1.relations)(exports.userTable, ({ many }) => ({
    appointments: many(exports.appointmentTable)
}));
//  user contact relationship
exports.user_contact_relations = (0, drizzle_orm_1.relations)(exports.userTable, ({ many }) => ({
    contacts: many(exports.contactTable)
}));
//  user feedback relationship
exports.user_feedback_relations = (0, drizzle_orm_1.relations)(exports.userTable, ({ many }) => ({
    feedbacks: many(exports.feedbackTable)
}));
//  doctor- department relationship
exports.doctor_department_relations = (0, drizzle_orm_1.relations)(exports.doctorsTable, ({ one }) => ({
    deprtment: one(exports.departmentTable, {
        fields: [exports.doctorsTable.department_id],
        references: [exports.departmentTable.id]
    })
}));
//  department doctor relationship
exports.department_doctor_relations = (0, drizzle_orm_1.relations)(exports.departmentTable, ({ many }) => ({
    doctors: many(exports.doctorsTable)
}));
//  doctor appointment relationship
exports.doctor_appointment_relations = (0, drizzle_orm_1.relations)(exports.doctorsTable, ({ many }) => ({
    appointments: many(exports.appointmentTable)
}));
