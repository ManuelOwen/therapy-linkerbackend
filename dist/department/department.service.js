"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentService = exports.updateDepartmentService = exports.createDepartmentService = exports.getDepartmentService = exports.departmentService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const departmentService = async (limit) => {
    if (limit) {
        return await db_1.db.query.departmentTable.findMany({ limit: limit });
    }
    return await db_1.db.query.departmentTable.findMany();
};
exports.departmentService = departmentService;
const getDepartmentService = async (id) => {
    return await db_1.db.query.departmentTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.departmentTable.id, id)
    });
};
exports.getDepartmentService = getDepartmentService;
const createDepartmentService = async (user) => {
    await db_1.db.insert(schema_1.departmentTable).values(user);
    return "Department created successfully";
};
exports.createDepartmentService = createDepartmentService;
const updateDepartmentService = async (id, user) => {
    await db_1.db.update(schema_1.departmentTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.departmentTable.id, id));
    return "Department updated successfully";
};
exports.updateDepartmentService = updateDepartmentService;
const deleteDepartmentService = async (id) => {
    await db_1.db.delete(schema_1.departmentTable).where((0, drizzle_orm_1.eq)(schema_1.departmentTable.id, id));
    return "Department deleted successfully";
};
exports.deleteDepartmentService = deleteDepartmentService;
