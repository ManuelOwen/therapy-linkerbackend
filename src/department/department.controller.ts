import {Context} from "hono";
import { departmentService,createDepartmentService,updateDepartmentService,deleteDepartmentService,getDepartmentService  } from "./department.service";


export const listDepartments = async (c: Context) => {
    try {
      

        const limit = Number(c.req.query('limit'))

        const data = await departmentService(limit);
        if (data == null || data.length == 0) {
            return c.text("department not found", 404)
          
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

 export const getDepartments = async (c:Context)=>{
    try{
        const data = await departmentService();
        return c.json(data)
    }catch(error:any){
        return c.json({message:error.message}, 500)
    }

 }

 export const getDepartment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const data = await getDepartmentService(id);
    if (data == undefined) {
        return c.text("department not found", 404);
    }
    return c.json(data, 200);
}
//create department
export const createDepartment = async (c: Context) => {
    try {
        const department = await c.req.json();
        const createdDepartment = await createDepartmentService(department);


        if (!createdDepartment) return c.text("Department not created", 404);
        return c.json({ msg: createdDepartment }, 201);
        console.log("msg")

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//update department
export const updateDepartment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const department = await c.req.json();
    try {
        // search for the d
        const searchedDepartment = await getDepartmentService(id);
        if (searchedDepartment == undefined) return c.text("Department not found", 404);
        // get the data and update it
        const res = await updateDepartmentService(id, department);
        // return a success message
        if (!res) return c.text("Department not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//delete fleetManagement
export const deleteDepartment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
     
        const department = await getDepartmentService(id);
        if (department == undefined) return c.text("Department not found", 404);
    
        const res = await deleteDepartmentService(id);
        if (!res) return c.text("department not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}