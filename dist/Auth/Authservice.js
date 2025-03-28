"use strict";
// import { TIauthOnUser,TSauthOnUser,  AuthOnUserTable, userTable } from "../drizzle/schema";
// import { db } from "../drizzle/db";
// import { Column, sql } from "drizzle-orm";
// export const createAuthUserService = async (user: TIauthOnUser): Promise<string | null> => {
//     await db.insert(AuthOnUserTable).values(user);
//     return "User created successfully";
// }
// export const userLoginService = async (user: { email: string; password: string }) => {
//     const { email } = user;
//     return await db.query.userTable.findFirst({
//         columns: {
//             id: true,
//             full_name: true,
//             email: true,
//             contact_phone: true,
//             role: true,
//             createdAt: true,
//             updatedAt: true,
//             },
//         where: sql`${userTable.email} = ${email}` 
//             // email: { equals: email } as { equals: string }
//     });
// }
