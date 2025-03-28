"use strict";
// import "dotenv/config";
// import { Context } from "hono";
// import { createAuthUserService, userLoginService } from "./Authservice";
// import bcrypt from "bcrypt";
// import { sign } from "hono/jwt";
// // import { TSauthOnUser, TIauthOnUser,AuthOnUserTable } from "../drizzle/schema";
// export const registerUserController = async (c: Context) => {
//     try {
//         const user = await c.req.json();
//         const pass = user.password;
//         const hashedPassword = await bcrypt.hash(pass, 10);
//         user.password = hashedPassword;
//         const createUser = await createAuthUserService(user);
//         if (!createUser) return c.text("User not created", 400);
//         return c.json({ message: createUser }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400);
//     }
// }
// export const loginUserController = async (c: Context) => {
//     try {
//         const user = await c.req.json();
//         const userExists = await userLoginService(user);
//         if (!userExists) {
//             return c.json({ error: "User not found" }, 404);
//         }
//         const userMatch = Array.isArray(userExists) ? await bcrypt.compare(user.password, userExists[0].password) : true;
//         if (!userMatch) {
//             return c.json({ error: "Invalid Credentials" }, 400);
//         } else {
//             const payload = {
//                 sub: userExists.full_name,
//                 role: userExists.role,
//                 exp: Math.floor(Date.now() / 1000) + (60 * 120) // 2 hours expiration
//             };
//             const secret = process.env.JWT_SECRET as string; // JWT secret
//             const token = await sign(payload, secret); // Generate token
//             const loggedInUser = {
//                 user_id: userExists.id, 
//                 role: userExists.role,
//                 email: userExists.email,
//                 name: userExists.full_name
//             };
//             return c.json({ token, user: loggedInUser }, 200);
//         }
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400);
//     }
// };
