
import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import {  TIdoctors, TSdoctors, doctorsTable } from "../drizzle/schema";

export const doctorsService = async ():Promise<TSdoctors[] | null>=> {
    return await db.query.doctorsTable.findMany();    
}

export const getDoctorbyIdService = async (id:number):Promise<TIdoctors | undefined> => {
    return await db.query.doctorsTable.findFirst({
       where: eq(doctorsTable.id, id)
    })
}

export const createDoctorService = async(doctor:TIdoctors) => {
     await db.insert(doctorsTable).values(doctor)
    // .returning({id:doctorsTable.doctor_id}
        return "doctor created successfully ";
}

export const updateDoctorService = async(id:number,doctor:TIdoctors) => {
    await db.update(doctorsTable).set(doctor).where(eq(doctorsTable.id,id));
    return "doctor updated successfully "
}

export const deleteDoctorService = async(id:number) => {
    await db.delete(doctorsTable).where(eq(doctorsTable.id,id));
    return "doctor deleted successfully "
}
