import { Context } from "hono";
import {contactService,getContactbyIdService,insertContactService,updateContactService, deleteContactService} from "./contactservice";

//list contactService
export const listContacts = async (c:Context) => {
    try{
        const data = await contactService();
        if(contactService == null) return c.text("No contactService found ",404)
        return c.json(contactService,200)
    }catch  (error:any) {
        return c.text(error?.message,400)
    }
}

//get contactService by id
export const getContact = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = parseInt(c.req.param("id"));
    try{
        if(isNaN(id))    return c.text("Invalid ID ",400)
        //search for contactService
        const contactService = await getContactbyIdService(id);
        if(contactService == undefined) return c.text("contactService not found ",404)
        return c.json(contactService,200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//insert contactService
export const createContact= async (c:Context) => {
    // return c.text("Not implemented yet",501)
    try {
        const contactService = await c.req.json();
        const createdcontactService = await insertContactService(contactService);
        if(!createdcontactService) {
            return c.text("contactService not created ",400) 
        } 
        return c.json(contactService,201)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//update contactService
export const updateContact = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    const contactService = await c.req.json();
    try{
        if(isNaN(id))  return c.text("Invalid ID ",400)
        //search for contactService
        const existingcontactService = await getContactbyIdService(id);
        if(existingcontactService == undefined) return c.text("contactService not found ",404)
        //update contactService
        const updatedcontactService = await updateContactService(id,contactService);
        return c.json({msg: updatedcontactService},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}

//delete contactService
export const deleteContact = async (c:Context) => {
    // return c.text("Not implemented yet",501)
    const id = Number(c.req.param("id"));
    try{
        if(isNaN(id))  return c.text("Invalid ID ",400)
        //search for contactService
        const existingContactService = await getContactbyIdService(id);
        if(existingContactService == undefined) return c.text("contactService not found ",404)
        //delete contactService
        const res = await deleteContactService(id);
        return c.json({msg: deleteContactService},200)
    } catch (error:any) {
        return c.text(error?.message,400)
    }
}