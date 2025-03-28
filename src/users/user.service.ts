import { eq,sql } from "drizzle-orm";
import { db } from "../drizzle/db";
import { TIuser, TSuser, userTable } from "../drizzle/schema";

export const usersService = async (limit?: number): Promise<TSuser[]> => {
    if(limit){
        return await db.query.userTable.findMany({limit:limit})
    }
    return await db.query.userTable.findMany();
}

export const getUserService = async (id: number): Promise<TIuser | undefined> => {
    return await db.query.userTable.findFirst({
        where: eq(userTable.id, id)
    })
}



 export const createUserService = async (user:TIuser)=> {
    await db.insert(userTable).values(user)
    return "User created successfully";
 }
    export const updateUserService = async (id:number, user:TIuser)=>{
        await db.update(userTable).set(user).where(eq(userTable.id, id))
        return "User updated successfully";
    }
    export const deleteUserService = async (id:number)=>{
        await db.delete(userTable).where(eq(userTable.id, id))
        return "User deleted successfully";
    }

    export const userLoginService = async (user: { email: string }) => {
        const { email } = user;
    
        const foundUser = await db.query.userTable.findFirst({
            columns: {
                id: true,
                full_name: true,
                contact_phone: true,
                email: true,
                password: true,
                role: true, 
            },
            where: sql`${userTable.email} = ${email}`,
        });
    
        console.log("Found user:", foundUser); // Debugging
    
        return foundUser;
    };
    