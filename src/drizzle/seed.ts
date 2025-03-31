import { ne } from "drizzle-orm";
import { db } from "./db";
import {
userTable,
appointmentTable,
contactTable,
departmentTable,
doctorsTable,
feedbackTable,

} from "./schema";
// 1. User Table
export const users = [
{
full_name: "John Doe",
email: "johndoe1@gmail.com",
password: "12345",
contact_phone: "08012345678",
role: "admin" as const
},
{
full_name: "Jane Doe",
email: "janedoe1@gmail.com",
password: "12345",
contact_phone: "08012345678",
role: "user" as const
}
];

// 2. Appointment Table
export const appointment = [
{
id: 1,
user_id: 1,
appointment_date: new Date(),
return_date: new Date(),
total_amount: 5000,
appointment_status: "pending" as const
},
{
id: 2,
user_id: 2,
appointment_date: new Date(),
return_date: new Date(),
total_amount: 5000,
appointment_status: "approved" as const
}
];
// 3. Contact Table
export const contact = [
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
export const department = [
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
export const doctors = [
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
export const feedback = [
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

export async function seed() {
await db.insert(userTable).values(users);
//await db.insert(appointmentTable).values(appointment);
await db.insert(contactTable).values(contact);
await db.insert(departmentTable).values(department);
await db.insert(doctorsTable).values(doctors);
await db.insert(feedbackTable).values(feedback);
}


seed().then(() => console.log("Seeding complete")).catch(console.error)