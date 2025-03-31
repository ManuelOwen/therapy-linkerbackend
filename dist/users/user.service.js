"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginService = exports.deleteUserService = exports.updateUserService = exports.createUserService = exports.getUserService = exports.usersService = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const db_1 = require("../drizzle/db");
const schema_1 = require("../drizzle/schema");
const usersService = async (limit) => {
    if (limit) {
        return await db_1.db.query.userTable.findMany({ limit: limit });
    }
    return await db_1.db.query.userTable.findMany();
};
exports.usersService = usersService;
const getUserService = async (id) => {
    return await db_1.db.query.userTable.findFirst({
        where: (0, drizzle_orm_1.eq)(schema_1.userTable.id, id)
    });
};
exports.getUserService = getUserService;
const createUserService = async (user) => {
    await db_1.db.insert(schema_1.userTable).values(user);
    return "User created successfully";
};
exports.createUserService = createUserService;
const updateUserService = async (id, user) => {
    await db_1.db.update(schema_1.userTable).set(user).where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id));
    return "User updated successfully";
};
exports.updateUserService = updateUserService;
const deleteUserService = async (id) => {
    await db_1.db.delete(schema_1.userTable).where((0, drizzle_orm_1.eq)(schema_1.userTable.id, id));
    return "User deleted successfully";
};
exports.deleteUserService = deleteUserService;
const userLoginService = async (user) => {
    const { email } = user;
    const foundUser = await db_1.db.query.userTable.findFirst({
        columns: {
            id: true,
            full_name: true,
            contact_phone: true,
            email: true,
            password: true,
            role: true,
        },
        where: (0, drizzle_orm_1.sql) `${schema_1.userTable.email} = ${email}`,
    });
    console.log("Found user:", foundUser); // Debugging
    return foundUser;
};
exports.userLoginService = userLoginService;
