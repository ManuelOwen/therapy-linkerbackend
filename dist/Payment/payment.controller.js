"use strict";
// import { Context } from "hono";
// import { 
//     createPaymentService, 
//     deletePaymentService, 
//     getPaymentByBookingIdService, 
//     getPaymentByUserIdService, 
//     getPaymentService, 
//     paymentService, 
//     updatePaymentService, 
//     updatePaymentSessionIdService
// } from "./payment.service";
// import Stripe from "stripe";
// import { frontendUrl } from "../utils/Domains";
// const stripe =new Stripe(process.env.STRIPE_SECRET as string,{    apiVersion:'2024-06-20' })
// export const listPayments = async (c: Context) => {
//     try {
//         const limit = Number(c.req.query('limit'));
//         const data = await paymentService(limit);
//         if (data == null || data.length === 0) {
//             return c.text("Payment not found", 404);
//         }
//         return c.json(data, 200);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400);
//     }
// }
// export const getPayments = async (c: Context) => {
//     try {
//         const data = await paymentService();
//         return c.json(data);
//     } catch (error: any) {
//         return c.json({ message: error.message }, 500);
//     }
// }
// export const getPayment = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);
//     const payment = await getPaymentService(id);
//     if (payment === undefined) {
//         return c.text("Payment not found", 404);
//     }
//     return c.json(payment, 200);
// }
// export const createPayment = async (c: Context) => {
//     try {
//         const payment = await c.req.json();
//         const createdPayment = await createPaymentService(payment);
//         if (!createdPayment) return c.text("Payment not created", 404);
//         return c.json({ msg: createdPayment }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400);
//     }
// }
// // get payment by user id
// export const getPaymentByUserId = async (c: Context) => {
//     try {
//         const user_id = c.req.param("user_id");
//         const parsedUserId = parseInt(user_id);
//         const payment = await getPaymentByUserIdService(parsedUserId);
//         if (!payment) {
//             return c.json({ message: "Payment not found" }, 404);
//         }
//         return c.json(payment, 200);
//     } catch (error: any) {
//         return c.json({ message: error.message }, 400);
//     }
// }
// export const updatePayment = async (c: Context) => {
//     const id = parseInt(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);
//     const payment = await c.req.json();
//     try {
//         const searchedPayment = await getPaymentByBookingIdService(id);
//         if (searchedPayment === undefined) return c.text("Payment not found", 404);
//         const res = await updatePaymentService(id, payment);
//         if (!res) return c.text("Payment not updated", 404);
//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400);
//     }
// }
// export const deletePayment = async (c: Context) => {
//     const id = Number(c.req.param("id"));
//     if (isNaN(id)) return c.text("Invalid ID", 400);
//     try {
//         const payment = await getPaymentService(id);
//         if (payment === undefined) return c.text("Payment not found", 404);
//         const res = await deletePaymentService(id);
//         if (!res) return c.text("Payment not deleted", 404);
//         return c.json({ msg: res }, 201);
//     } catch (error: any) {
//         return c.json({ error: error?.message }, 400);
//     }
// }
// export const getPaymentByBooking = async (c: Context) => {
//     try {
//         const { booking_id } = c.req.param();
//         const payment = await getPaymentByBookingIdService(parseInt(booking_id));
//         if (!payment) {
//             return c.json({ message: "Payment not found" }, 404);
//         }
//         return c.json(payment, 200);
//     } catch (error: any) {
//         return c.json({ message: error.message }, 400);
//     }
// }
// // checkout
// export const createCheckoutSession = async (c: Context) => {
//     let booking;
//     try {
//         booking = await c.req.json();
//     } catch (error: any) {
//         return c.json({ message: error.message }, 400);
//     }
//     try {
//         if (!booking.id) return c.json({ message: "Booking ID is required" }, 400);
//         const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] = [{
//             price_data: {
//                 currency: "usd",
//                 product_data: {
//                     name: "OwenRides",
//                 },
//                 unit_amount: Math.round(booking.total_amount * 100),
//             },
//             quantity: 1
//         }];
//         const sessionParams: Stripe.Checkout.SessionCreateParams = {
//             payment_method_types: ["card"],
//             line_items,
//             mode: "payment",
//             success_url: `${frontendUrl}/dashboard/user/paymentsuccess`,
//             cancel_url:  `${frontendUrl}/dashboard/user/home`,
//         };
// const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(sessionParams);
//         // Save payments to the database
//         const paymentDetails = {
//             booking_id: booking.id,
//             payment_date: new Date(),
//             payment_amount: booking.total_amount,
//             user_id: booking.user_id,                   
//             transaction_id: session.id,
//         };
//         const createdPayment = await createPaymentService(paymentDetails);
//         return c.json({ id: session.id, createdPayment }, 200);
//     } catch (error: any) {
//         return c.json({ message: error.message }, 400);
//     }
// }
// // web hook
// export const handleStripeWebhook = async (c: Context) => {
//     const sig = c.req.header("stripe-signature");
//     const rawBody = await c.req.text();
//     if (!sig) {
//         console.log('Signature not provided');
//         return c.text("No signature", 400);
//     }
//     let event: Stripe.Event;
//     try {
//         event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_ENDPOINT_SECRET as string);
//     } catch (error: any) {
//         console.log("Error", error.message);
//         return c.json({ message: "Webhook Error" }, 400);
//     }
//     // Handle the event
//     switch (event.type) {
//         case 'checkout.session.completed':
//             const session = event.data.object as Stripe.Checkout.Session;
//             // update the payment
//             try {
//                 const Session_id = session.id;
//                 const updateStatus = await updatePaymentSessionIdService(Session_id);
//             } catch (error: any) {
//                 return c.json({ message: error.message }, 400);
//             }
//             break;
//         default:
//             console.log(`Unhandled event type ${event.type}`);
//             return c.json({ message: `Unhandled event type ${event.type}` }, 200);
//     }
//     return c.json({ received: true }, 200);
// }
