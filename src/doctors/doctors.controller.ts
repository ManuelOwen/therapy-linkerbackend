import { Context } from "hono";
import {doctorsService, getDoctorbyIdService, updateDoctorService, deleteDoctorService,createDoctorService } from "./doctors.service";

//list doctorService
export const listDoctors = async (c:Context) => {
    try{
        const data = await doctorsService();
        if(doctorsService == null) return c.text("No doctors found ",404)
        return c.json(data,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get doctorService by id
export const GetDoctor = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID ",400)
        //search for doctorService
        const data = await getDoctorbyIdService(id);
        if(data == undefined) return c.text("doctorService not found ",404)
        return c.json(data,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert doctorService
export const createDoctor= async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const doctor = await c.req.json();
        const createdDoctor = await createDoctorService(doctor);
        if(!createdDoctor) {
            return c.text("doctor not created ",400) 
        } 
        return c.json({msg:createdDoctor},201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update doctorService
export const updateDoctor = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const doctor = await c.req.json();
    const updatedDoctor = await updateDoctorService(id, doctor);
    if (!updatedDoctor) return c.text("doctor not updated", 404);
    return c.json({ msg: updatedDoctor }, 200);

}



//delete vehicle
export const deleteDoctor = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    const deletedDoctor = await deleteDoctorService(id);
    if (!deletedDoctor) return c.text("doctor not deleted", 404);
    return c.json({ msg: deletedDoctor }, 200);
}