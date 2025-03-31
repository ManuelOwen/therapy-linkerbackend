import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TIappointment, TSappointment, appointmentTable } from "../drizzle/schema";
import http from "http";

const PORT = process.env.PORT || 8000;

if (require.main === module) { // Ensure the server runs only when executed directly
    const server = http.createServer((req, res) => {
        // ...existing server logic...
    });

    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });

    server.on("error", (err) => {
        if ((err as NodeJS.ErrnoException).code === "EADDRINUSE") {
            console.error(`Port ${PORT} is already in use. Please use a different port.`);
            process.exit(1); // Exit the process with an error code
        } else {
            throw err; // Re-throw other errors
        }
    });
}

// getting many appiontments
export const appointmentService = async (): Promise<TIappointment[]> => {
        return await db.query.appointmentTable.findMany();
    return await db.query.appointmentTable.findMany();
}
//  Getting a single appointment
export const getAppointmentService = async (id: number): Promise<TIappointment | undefined> => {
    return await db.query.appointmentTable.findFirst({
        where: eq(appointmentTable.id, id)
    })
}


// creating an appointment
 export const createAppointmentService = async (user:TIappointment)=> {
    await db.insert(appointmentTable).values(user)
    return "Booking created successfully";

 }
//  update Appointment
    export const updateAppointmentService = async (id:number, user:TIappointment)=>{
        await db.update(appointmentTable).set(user).where(eq(appointmentTable.id, id))
        return "Booking updated successfully";
    }
    // delete Appointment
    export const deleteAppointmentService = async (id:number)=>{
        await db.delete(appointmentTable).where(eq(appointmentTable.id, id))
        return "Booking deleted successfully";
    }
    // get bookings by user id
    export const getAppointmentByUserIdService = async (id:number): Promise<TIappointment[]>=>{
        return await db.query.appointmentTable.findMany({
            where: eq(appointmentTable.userId, id)
        })
    }