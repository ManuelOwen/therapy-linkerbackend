"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    password: zod_1.z.string(),
    role: zod_1.z.string().optional()
});
exports.registerUserSchema = zod_1.z.object({
    full_name: zod_1.z.string(),
    email: zod_1.z.string(),
    contact_phone: zod_1.z.string(),
    // password: z.string(),
    role: zod_1.z.string().optional()
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string()
});
