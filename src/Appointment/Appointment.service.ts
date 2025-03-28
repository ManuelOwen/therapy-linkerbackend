import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TIappointment,TSappointment, appointmentTable } from "../drizzle/schema";  
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
            where: eq(appointmentTable.user_id, id)
        })
    }