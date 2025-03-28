import {Context} from "hono";
import { usersService, getUserService, createUserService, updateUserService, deleteUserService,userLoginService  } from "./user.service";
import { sendRegistrationEmail } from "../helperfunction/helperfunction";
import bcrypt from "bcrypt";
import { array } from "zod";
import { sign } from "hono/jwt";
import { TIuser } from "../drizzle/schema";
import { ClientPageRoot } from "next/dist/client/components/client-page";
import { error } from "console";
// import { error } from "console";
;


export const listUsers = async (c: Context) => {
    try {
        //limit the number of users to be returned

        const limit = Number(c.req.query('limit'))

        const data = await usersService(limit);
        if (data == null || data.length == 0) {
            return c.text("User not found", 404)
          
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

 export const getUsers = async (c:Context)=>{
    try{
        const data = await usersService();
        return c.json(data)
    }catch(error:any){
        return c.json({message:error.message}, 500)
    }

 }
 //get user by id
 export const getUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);
    console.log("ID:", id); // Debugging
    
    const user = await getUserService(id);
    if (user == undefined) {
        return c.text("User not found", 404);
    }
    return c.json(user, 200);
}
//create user
export const createUser = async (c: Context) => {
    try {
        const user = await c.req.json();
        const password = user.password;
        const hashesdPassword = await bcrypt.hash(password, 10);
        user.password = hashesdPassword;
        const createdUser = await createUserService(user);
        if (!createdUser){ return c.text("User not created", 404);
        }else{
            const email = user.email;
            const eventName = "Account creation";

            // send  email
            const emailResponse = await sendRegistrationEmail(email,eventName);
            console.log("email res", emailResponse)
            return c.json({msg:emailResponse, createdUser}, 201)
        }

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
        console.log(error)
    }
}
// login user
export const loginUser = async (c: Context) => {
    try {
        const user = await c.req.json();

        // Check if user exists
        const userExists = await userLoginService(user);
        if (userExists === null) return c.json({ message: "User not found" }, 404);

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(user.password, userExists?.password as string);
        if (!isPasswordCorrect) {
            return c.json({ error: "Invalid credentials" }, 400); // Invalid password
        } else {
            // Create payload
            const payload = {
                user_id: userExists?.id,
                name: userExists?.full_name,
                email: userExists?.email,
                role: userExists?.role,
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 3), // Token expiration (3 days)
            };

            const secret = process.env.JWT_SECRET as string;
            if (!secret) {
                console.error("JWT_SECRET is not defined in environment variables");
                return c.json({ error: "Internal server error" }, 500);
            }

            const token = await sign(payload, secret);

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
    } catch (error: any) {
        console.error("Login error:", error);
        return c.json({ error: `Internal Server Error: ${error.message}` }, 500);
    }
    

};





//update user
export const updateUser = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const user = await c.req.json();
    try {
        // search for the user
        const searchedUser = await getUserService(id);
        if (searchedUser == undefined) return c.text("User not found", 404);
        // get the data and update it
        const res = await updateUserService(id, user);
        // return a success message
        if (!res) return c.text("User not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
//delete user
export const deleteUser = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the user
        const user = await getUserService(id);
        if (user == undefined) return c.text("User not found", 404);
        //deleting the user
        const res = await deleteUserService(id);
        if (!res) return c.text("User not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
        console.log(error)
    }
}
// login  user