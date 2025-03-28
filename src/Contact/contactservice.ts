
import { eq } from "drizzle-orm";
import {db} from "../drizzle/db";

import {  TIcontact,  TScontact,  contactTable } from "../drizzle/schema";

export const contactService = async ():Promise<TScontact[] | null>=> {
    return await db.query.contactTable.findMany();    
}

export const getContactbyIdService = async (id:number):Promise<TIcontact | undefined> => {
    return await db.query.contactTable.findFirst({
       where: eq(contactTable, id)
    })
}

export const insertContactService = async(contact:TIcontact) => {
     await db.insert(contactTable).values(contact)
    // .returning({id:contactTable.contact_id}
        return "contact created successfully ";
}

export const updateContactService = async(id:number,contact:TIcontact) => {
    await db.update(contactTable).set(contact).where(eq(contactTable,id));
    return "contact updated successfully "
}

export const deleteContactService = async(id:number) => {
    await db.delete(contactTable).where(eq(contactTable,id));
    return "contact deleted successfully "
}
