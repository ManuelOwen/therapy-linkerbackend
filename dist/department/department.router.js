"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.departmentRouter = void 0;
const hono_1 = require("hono");
const department_controller_1 = require("./department.controller");
// import convertDateFields from "../utils/DateUtils";
exports.departmentRouter = new hono_1.Hono();
// GET ALL department
exports.departmentRouter.get("/department", department_controller_1.getDepartments);
//grt a single department
exports.departmentRouter.get("/department/:id", department_controller_1.getDepartment);
//create department
exports.departmentRouter.post("/department", department_controller_1.createDepartment);
//update department
exports.departmentRouter.put("/department/:id", department_controller_1.updateDepartment);
//delete department
exports.departmentRouter.delete("/department/:id", department_controller_1.deleteDepartment);
