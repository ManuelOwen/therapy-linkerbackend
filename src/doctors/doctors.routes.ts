 import {Hono} from "hono"
import {listDoctors,GetDoctor,createDoctor,updateDoctor,deleteDoctor } from "./doctors.controller";
import { adminRoleAuth } from "../middlewares/bearAuth";

export const doctorsRouter = new Hono();

//get all Doctors
doctorsRouter.get('/doctor',listDoctors)

//get doctor by id
doctorsRouter.get('/doctor/:id', GetDoctor)

//insert doctor
doctorsRouter.post('/doctor', createDoctor)

//update doctor
doctorsRouter.put('/doctor/:id', updateDoctor)

//delete doctor
doctorsRouter.delete('/doctor/:id', deleteDoctor)