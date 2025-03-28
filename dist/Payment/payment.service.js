"use strict";
// import { eq } from "drizzle-orm";
// import {db} from "../drizzle/db";
// import {  TIpayment, TSpayment, paymentTable } from "../drizzle/schema";
// // import {stripe}  from "../drizzle/db"
// import { Session } from "inspector";
// export const paymentService: (limit?: number) => Promise<TSpayment[]> = async (limit?: number): Promise<TSpayment[]> => {
//     if(limit){
//         return await db.query.paymentTable.findMany({limit:limit})
//     }
//     return await db.query.paymentTable.findMany();
// }
// // get payment service
// export const getPaymentService = async (id: number): Promise<TSpayment | undefined> => {
//     return await db.query.paymentTable.findFirst({
//         where: eq(paymentTable.payment_id, id)
//     })
// }
// // get payment byuser id service
// export const getPaymentByUserIdService = async (user_id:number)=>{
//     return await db.query.paymentTable.findMany({
//         where: eq(paymentTable.user_id, user_id)
//     })
// }
// // get payment by booking id
// export const getPaymentByBookingIdService = async (user_id:number)=>{
//     return await db.query.paymentTable.findFirst({
//         where: eq(paymentTable.booking_id, user_id)
//     })
// }
// // create payment service
//  export const createPaymentService = async (payment:TIpayment)=> {
//     await db.insert(paymentTable).values(payment)
//     return "payment created successfully";
//  }
// //  update payment service
//     export const updatePaymentService = async (id:number, payment:TIpayment)=>{
//         await db.update(paymentTable).set(payment).where(eq(paymentTable.payment_id, id))
//         return "payment updated successfully";
//     }
//     // delete payment service
//     export const deletePaymentService = async (id:number)=>{
//         await db.delete(paymentTable).where(eq(paymentTable.payment_id, id))
//         return "payment deleted successfully";
//     }
//     // update payment session id
//     export const updatePaymentSessionIdService = async (Session_id:string, )=>{
//         await db.update(paymentTable).set({payment_status: true}).where(eq(paymentTable.transaction_id, Session_id)).execute();
//         return "payment updated successfully";
//     }
