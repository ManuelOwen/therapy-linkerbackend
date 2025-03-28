import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";
import { TSdepartment, TIdepartment, departmentTable } from "../drizzle/schema";

export const departmentService = async (limit?: number): Promise<TIdepartment[]> => {
    if(limit){
        return await db.query.departmentTable.findMany({limit:limit})
    }
    return await db.query.departmentTable.findMany();
}

export const getDepartmentService = async (id: number): Promise<TIdepartment | undefined> => {
    return await db.query.departmentTable.findFirst({
        where: eq(departmentTable.id, id)
    })
}



 export const createDepartmentService = async (user:TIdepartment)=> {
    await db.insert(departmentTable).values(user)
    return "Department created successfully";
 }
    export const updateDepartmentService = async (id:number, user:TIdepartment)=>{
        await db.update(departmentTable).set(user).where(eq(departmentTable.id, id))
        return "Department updated successfully";
    }
    export const deleteDepartmentService = async (id:number)=>{
        await db.delete(departmentTable).where(eq(departmentTable.id, id))
        return "Department deleted successfully";
    }