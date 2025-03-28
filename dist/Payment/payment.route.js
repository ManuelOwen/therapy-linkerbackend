"use strict";
// import {Hono} from "hono";
// import {createCheckoutSession, createPayment,deletePayment,getPayment,getPaymentByBooking,getPayments,listPayments,updatePayment,getPaymentByUserId} from "./payment.controller";
// import {zValidator}from "@hono/zod-validator";
// import { adminRoleAuth } from "../middlewares/bearAuth";
// import convertDateFields from "../utils/DateUtils";
// // import { paymentSchema } from "../validators/payment.validator"
// // import {paymentSchema} from "../validators";
// export const paymentRouter = new Hono();
// // GET ALL payments
// paymentRouter.get("/payment", getPayments);
// //get a single payment
// paymentRouter.get("/payment/:id", getPayment);
// //create payment
// paymentRouter.post("/payment", async (c) => {
//     const body = await c.req.json()
//     convertDateFields(body, ['payment_date', 'return_date', 'createdAt', 'updatedAt'])
//     return c.json({ message: 'payment created successfully'})
// });
// // get payment by user id
// paymentRouter.get("/payment-user/:user_id", getPaymentByUserId)
// //update payment
// paymentRouter.put("/payment/:id", async (c) => {
//     const body = await c.req.json()
//     convertDateFields(body, ['payment_date', 'return_date', 'createdAt', 'updatedAt'])
//     return c.json({ message: 'payment updated successfully'})
// });
// //delete payment
//  paymentRouter.delete("/payment/:id",adminRoleAuth, deletePayment)
// //  payment by booking
// paymentRouter.get("/payment/booking/:id",adminRoleAuth, getPaymentByBooking)
// // checkout session
// paymentRouter.post("/checkout-session/:id",createCheckoutSession )
