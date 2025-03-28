import {Hono} from "hono";
import {getDepartment,getDepartments,createDepartment, updateDepartment,deleteDepartment} from "./department.controller";
import { adminRoleAuth } from "../middlewares/bearAuth";
// import convertDateFields from "../utils/DateUtils";

export const departmentRouter = new Hono();

// GET ALL department
departmentRouter.get("/department", getDepartments);
//grt a single department
departmentRouter.get("/department/:id", getDepartment);
//create department
departmentRouter.post("/department",createDepartment)
//update department
departmentRouter.put("/department/:id", updateDepartment)
   //delete department
departmentRouter.delete("/department/:id", deleteDepartment)
