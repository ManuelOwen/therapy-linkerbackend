"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const hono_1 = require("hono");
const user_controller_1 = require("./user.controller");
// import {userSchema} from "../validators";
exports.userRouter = new hono_1.Hono();
// GET ALL users
exports.userRouter.get("/users", user_controller_1.getUsers);
//grt a single user
exports.userRouter.get("/users/:id", user_controller_1.getUser);
//create user
exports.userRouter.post("/users", user_controller_1.createUser);
//update user
exports.userRouter.put("/users/:id", user_controller_1.updateUser);
//delete user
exports.userRouter.delete("/users/:id", user_controller_1.deleteUser);
// login user
exports.userRouter.post("/users/login", user_controller_1.loginUser);
