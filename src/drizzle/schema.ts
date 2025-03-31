import { serial, text, timestamp, pgTable, pgEnum, integer, varchar, boolean } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { department } from "./seed";




// 1. User table
export const roleEnum = pgEnum("role", ["admin", "user", "both"]);

export const userTable = pgTable("user", {
    id: serial("id").notNull().primaryKey(),
    full_name: varchar("full_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    contact_phone: varchar("contact_phone", { length: 255 }).notNull(),
    role: roleEnum("role").default("user"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});



// 2. Appointment table
export const appointmentStatusEnum = pgEnum("appontment_status", ["pending", "approved", "rejected", "cancelled"]);
export const appointmentTable = pgTable("appointment", {
    id: serial("id").notNull().primaryKey(),
    //user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
 
    email: varchar("email", { length: 255 }).notNull(),
    doctor: varchar("doctor", { length: 255 }).notNull(),
    department: integer("department").notNull().references(() => departmentTable.id, { onDelete: "cascade" }),
    appointment_date: timestamp("booking_date"),
    return_date: timestamp("return_date"),
    userId: integer("userId").notNull(), // Add this line
    appointment_status:appointmentStatusEnum("appointment_status").default("pending"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow()
});


// 3. Contact table
export const contactTable = pgTable("contact", {
   id: serial("id").notNull().primaryKey(),
   user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    message: varchar("subject", { length: 255 }).notNull(),
});
    



// 4.doctors table
export const doctorsTable = pgTable("doctorTable", {
    id:serial("id").notNull().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    position: varchar("position", { length: 255 }).notNull(),
    description: varchar("description", { length: 255 }).notNull(),
    department_id: integer("department_id").notNull().references(() => departmentTable.id, { onDelete: "cascade" }),
    image_url:varchar("image_url", {length: 255}),
});

// 5.Department table
export const departmentTable = pgTable("department", {
    id: serial("id").notNull().primaryKey(),
    department_name: varchar("name", { length: 255 }).notNull(),
    description: varchar("address", { length: 255 }).notNull(),
    
});



// 6. Feedback table
export const feedbackTable = pgTable("feedback", {
    feedback_id: serial("feedback_id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => userTable.id, { onDelete: "cascade" }),
    feedback_message: varchar("feedback_message"),
    createdAt: timestamp("created_at").defaultNow(),
    updatedAt: timestamp("updated_at").defaultNow(),
});

// Type Definitions
export type TIuser = typeof userTable.$inferInsert;
export type TSuser = typeof userTable.$inferInsert;
export type TIfeedback = typeof feedbackTable.$inferInsert;
export type TSfeedback = typeof feedbackTable.$inferSelect;
export type TIappointment = typeof appointmentTable.$inferInsert;
export type TSappointment = typeof appointmentTable.$inferSelect;
export type TIcontact = typeof contactTable.$inferInsert;
export type TScontact = typeof contactTable.$inferSelect;
export type TIdepartment = typeof departmentTable.$inferInsert;
export type TSdepartment = typeof departmentTable.$inferSelect;
export type TIdoctors = typeof doctorsTable.$inferInsert; 
export type TSdoctors = typeof doctorsTable.$inferSelect;

// Relationships
//  user appointment relationship
export const user_appointment_relations = relations(userTable, ({ many }) => ({
    appointments: many(appointmentTable)
}));

//  user contact relationship
export const user_contact_relations = relations(userTable, ({ many }) => ({
    contacts: many(contactTable)
}));

//  user feedback relationship
export const user_feedback_relations = relations(userTable, ({ many }) => ({
    feedbacks: many(feedbackTable)
}));

//  doctor- department relationship
export const doctor_department_relations = relations(doctorsTable, ({ one }) => ({
    deprtment: one(departmentTable, {
        fields: [doctorsTable.department_id],
        references: [departmentTable.id]
    })
}));


//  department doctor relationship
export const department_doctor_relations = relations(departmentTable, ({ many }) => ({
    doctors: many(doctorsTable)
}));
//  doctor appointment relationship
export const doctor_appointment_relations = relations(doctorsTable, ({ many }) => ({
    appointments: many(appointmentTable)
}));



