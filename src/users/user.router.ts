import {Hono} from "hono";
import {getUsers,getUser, createUser,updateUser,deleteUser, loginUser } from "./user.controller";
import {zValidator}from "@hono/zod-validator";
import { userSchema } from "../validators/user.validator"
import { adminRoleAuth } from "../middlewares/bearAuth";
// import {userSchema} from "../validators";
 
export const userRouter = new Hono();

// GET ALL users
userRouter.get("/users",getUsers,)
//grt a single user
userRouter.get("/users/:id", getUser);
//create user
userRouter.post("/users", createUser)
//update user
userRouter.put("/users/:id", updateUser)
//delete user
 userRouter.delete("/users/:id", deleteUser)
// login user
userRouter.post("/users/login", loginUser)


