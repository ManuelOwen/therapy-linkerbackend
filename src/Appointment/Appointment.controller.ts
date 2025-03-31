import {Context} from "hono";
import {appointmentService, getAppointmentService,createAppointmentService,updateAppointmentService,deleteAppointmentService,getAppointmentByUserIdService   } from "./Appointment.service";

//get all appointments

export const listAppointments = async (c: Context) => { 
    try {
        //limit the number of appointments to be returned

        // const limit = Number(c.req.query('limit'))

        const data = await appointmentService();
        if (data == null || data.length == 0) {
            return c.text("Appointment not found", 404)
          
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

 export const getAppointments = async (c:Context)=>{
    try{
        const data = await appointmentService();
        return c.json(data)
    }catch(error:any){
        return c.json({message:error.message}, 500)
    }

 }
 //get appointment by id
 export const getAppointment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const appointment = await getAppointmentService(id);
    if (appointment == undefined) {
        return c.text("appointment not found", 404);
    }
    return c.json(appointment, 200);
}
//create appointment
export const createAppointment = async (c: Context) => {
    try {
        const appointment = await c.req.json();
       

        // Safely parse dates
        if (appointment.appointment_date) {
            const parsedDate = new Date(appointment.appointment_date);
            if (isNaN(parsedDate.getTime())) {
                return c.text("Invalid appointment_date", 400);
            }
            appointment.appointment_date = parsedDate;
        }
        console.log(appointment)
        if (appointment.return_date) {
            const parsedReturnDate = new Date(appointment.return_date);
            if (isNaN(parsedReturnDate.getTime())) {
                return c.text("Invalid return_date", 400);
            }
            appointment.return_date = parsedReturnDate;
        }

        const createdAppointment = await createAppointmentService(appointment);

        if (!createdAppointment) return c.text("Appointment not created", 404);
        return c.json({ msg: createdAppointment }, 201);
    } catch (error: any) {
        console.log(error)
        return c.json({ error: error?.message }, 400);
    }

};


//update appointment
export const updateAppointment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const appointment = await c.req.json();

    // Ensure date fields are converted properly before updating
    if (appointment.appointment_date) {
        const parsedDate = new Date(appointment.appointment_date);
        if (isNaN(parsedDate.getTime())) {
            return c.text("Invalid appointment_date format", 400);
        }
        appointment.appointment_date = parsedDate;
    }

    if (appointment.return_date) {
        const parsedReturnDate = new Date(appointment.return_date);
        if (isNaN(parsedReturnDate.getTime())) {
            return c.text("Invalid return_date format", 400);
        }
        appointment.return_date = parsedReturnDate;
    }

    try {
        const searchedAppointment = await getAppointmentService(id);
        if (!searchedAppointment) return c.text("Appointment not found", 404);

        const res = await updateAppointmentService(id, appointment);
        if (!res) return c.text("Appointment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400);
    }
};

//delete appointment
export const deleteAppointment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the appointment
        const appointment = await getAppointmentService(id);
        if (appointment == undefined) return c.text("appointment not found", 404);
        //deleting the appointment
        const res = await deleteAppointmentService(id);
        if (!res) return c.text("appointment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//get appointment by user id
export const getAppointmentByUserId = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        const appointment = await getAppointmentByUserIdService(id);
        if (appointment == undefined) return c.text("appointment not found", 404);

        return c.json(appointment, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}