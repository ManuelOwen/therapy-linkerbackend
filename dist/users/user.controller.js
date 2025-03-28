"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.loginUser = exports.createUser = exports.getUser = exports.getUsers = exports.listUsers = void 0;
const user_service_1 = require("./user.service");
const helperfunction_1 = require("../helperfunction/helperfunction");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("hono/jwt");
// import { error } from "console";
;
const listUsers = async (c) => {
    try {
        //limit the number of users to be returned
        const limit = Number(c.req.query('limit'));
        const data = await (0, user_service_1.usersService)(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404);
        }
        return c.json(data, 200);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.listUsers = listUsers;
const getUsers = async (c) => {
    try {
        const data = await (0, user_service_1.usersService)();
        return c.json(data);
    }
    catch (error) {
        return c.json({ message: error.message }, 500);
    }
};
exports.getUsers = getUsers;
//get user by id
const getUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await (0, user_service_1.getUserService)(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
};
exports.getUser = getUser;
//create user
const createUser = async (c) => {
    try {
        const user = await c.req.json();
        const password = user.password;
        const hashesdPassword = await bcrypt_1.default.hash(password, 10);
        user.password = hashesdPassword;
        const createdUser = await (0, user_service_1.createUserService)(user);
        if (!createdUser) {
            return c.text("User not created", 404);
        }
        else {
            const email = user.email;
            const eventName = "Account creation";
            // send  email
            const emailResponse = await (0, helperfunction_1.sendRegistrationEmail)(email, eventName);
            console.log("email res", emailResponse);
            return c.json({ msg: emailResponse, createdUser }, 201);
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.createUser = createUser;
// login user
const loginUser = async (c) => {
    try {
        const user = await c.req.json();
        const userExists = await (0, user_service_1.userLoginService)(user);
        if (!userExists) {
            return c.json({ error: "User not found" }, 404);
        }
        const userMatch = Array.isArray(userExists) ? await bcrypt_1.default.compare(user.password, userExists[0].password) : true;
        if (!userMatch) {
            return c.json({ error: "Invalid Credentials" }, 400);
        }
        else {
            const payload = {
                sub: userExists.full_name,
                role: userExists.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 120) // 2 hours expiration
            };
            const secret = process.env.JWT_SECRET; // JWT secret
            const token = await (0, jwt_1.sign)(payload, secret); // Generate token
            const loggedInUser = {
                user_id: userExists.id,
                role: userExists.role,
                email: userExists.email,
                full_name: userExists.full_name
            };
            return c.json({ token, user: loggedInUser }, 200);
        }
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.loginUser = loginUser;
//update user
const updateUser = async (c) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await (0, user_service_1.getUserService)(id);
        if (searchedUser == undefined)
            return c.text("User not found", 404);
        // get the data and update it
        const res = await (0, user_service_1.updateUserService)(id, user);
        // return a success message
        if (!res)
            return c.text("User not updated", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.updateUser = updateUser;
//delete user
const deleteUser = async (c) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id))
        return c.text("Invalid ID", 400);
    try {
        //search for the user
        const user = await (0, user_service_1.getUserService)(id);
        if (user == undefined)
            return c.text("User not found", 404);
        //deleting the user
        const res = await (0, user_service_1.deleteUserService)(id);
        if (!res)
            return c.text("User not deleted", 404);
        return c.json({ msg: res }, 201);
    }
    catch (error) {
        return c.json({ error: error?.message }, 400);
    }
};
exports.deleteUser = deleteUser;
// login  user
