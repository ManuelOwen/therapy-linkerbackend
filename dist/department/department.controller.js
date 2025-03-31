"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.createDepartment = exports.getDepartment = exports.getDepartments = exports.listDepartments = void 0;
const department_service_1 = require("./department.service");
const listDepartments = async (c) => {
    try {
        const limit = Number(c.req.query('limit'));
        const data = await (0, department_service_1.departmentService)(limit);
        if (data == null || data.length == 0) {
            return c.text("department not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listDepartments = listDepartments;
const getDepartments = async (c) => {
    try {
        const data = await (0, department_service_1.departmentService)();
        return c.json(data);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
};
exports.getDepartments = getDepartments;
const getDepartment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const data = await (0, department_service_1.getDepartmentService)(id);
    if (data == undefined) {
        return c.text("department not found", 404);
    }
    return c.json(data, 200);
};
exports.getDepartment = getDepartment;
//create department
const createDepartment = async (c) => {
    try {
        const department = await c.req.json();
        const createdDepartment = await (0, department_service_1.createDepartmentService)(department);
        if (!createdDepartment)
            return c.text("Department not created", 404);
        return c.json({ msg: createdDepartment }, 201);
        console.log("msg");
    }
    catch (error) {
        console.log(error);
        return c.json({ error: error?.message }, 400);
    }
};
exports.createDepartment = createDepartment;
//update department
const updateDepartment = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const department = await c.req.json();
    try {
        // search for the d
        const searchedDepartment = await (0, department_service_1.getDepartmentService)(id);
        if (searchedDepartment == undefined)
            return c.text("Department not found", 404);
        // get the data and update it
        const res = await (0, department_service_1.updateDepartmentService)(id, department);
        // return a success message
        if (!res)
            return c.text("Department not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateDepartment = updateDepartment;
//delete fleetManagement
const deleteDepartment = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        const department = await (0, department_service_1.getDepartmentService)(id);
        if (department == undefined)
            return c.text("Department not found", 404);
        const res = await (0, department_service_1.deleteDepartmentService)(id);
        if (!res)
            return c.text("department not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteDepartment = deleteDepartment;
