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
    console.log("ID:", id); // Debugging
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
        console.log(error);
    }
};
exports.createUser = createUser;
// login user
const loginUser = async (c) => {
    try {
        const user = await c.req.json();
        // Check if user exists
        const userExists = await (0, user_service_1.userLoginService)(user);
        if (userExists === null)
            return c.json({ message: "User not found" }, 404);
        // Compare passwords
        const isPasswordCorrect = await bcrypt_1.default.compare(user.password, userExists?.password);
        if (!isPasswordCorrect) {
            return c.json({ error: "Invalid credentials" }, 400); // Invalid password
        }
        else {
            // Create payload
            const payload = {
                user_id: userExists?.id,
                name: userExists?.full_name,
                email: userExists?.email,
                role: userExists?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), // Token expiration (3 days)
            };
            const secret = process.env.JWT_SECRET;
            if (!secret) {
                console.error("JWT_SECRET is not defined in environment variables");
                return c.json({ error: "Internal server error" }, 500);
            }
            const token = await (0, jwt_1.sign)(payload, secret);
            // Return token and user details
            return c.json({
                token,
                user: {
                    id: userExists?.id,
                    name: userExists?.full_name,
                    email: userExists?.email,
                    role: userExists?.role,
                },
            }, 200);
        }
    }
    catch (error) {
        console.error("Login error:", error);
        return c.json({ error: `Internal Server Error: ${error.message}` }, 500);
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
        console.log(error);
    }
};
exports.deleteUser = deleteUser;
// login  user
