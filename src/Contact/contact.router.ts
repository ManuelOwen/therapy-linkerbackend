import {Hono} from "hono"
import {listContacts,getContact,createContact,updateContact,deleteContact} from "./contact.controller";
import { adminRoleAuth } from "../middlewares/bearAuth";

export const contactRouter = new Hono();

//get all contacts
contactRouter.get('/contact',adminRoleAuth,listContacts)

//get contact by id
contactRouter.get('/contact/:id',adminRoleAuth, getContact)

//insert contact
contactRouter.post('/contact',adminRoleAuth, createContact)

//update contact
contactRouter.put('/contact/:id',adminRoleAuth, updateContact)

//delete contact
contactRouter.delete('/customerSupport/:id',adminRoleAuth, deleteContact)