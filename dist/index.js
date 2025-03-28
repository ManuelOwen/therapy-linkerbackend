"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_server_1 = require("@hono/node-server");
const hono_1 = require("hono");
const prometheus_1 = require("@hono/prometheus");
require("dotenv/config");
const logger_1 = require("hono/logger");
const csrf_1 = require("hono/csrf");
const trailing_slash_1 = require("hono/trailing-slash");
const timeout_1 = require("hono/timeout");
const http_exception_1 = require("hono/http-exception");
const promises_1 = require("fs/promises");
const cors_1 = require("hono/cors");
// routers
const user_router_1 = require("./users/user.router");
const Appointment_router_1 = require("./Appointment/Appointment.router");
const contact_router_1 = require("./Contact/contact.router");
const department_router_1 = require("./department/department.router");
const doctors_routes_1 = require("./doctors/doctors.routes");
const app = new hono_1.Hono();
const { printMetrics, registerMetrics } = (0, prometheus_1.prometheus)();
// Middleware
app.use('*', (0, cors_1.cors)());
app.use((0, logger_1.logger)());
app.use((0, csrf_1.csrf)());
app.use((0, trailing_slash_1.trimTrailingSlash)());
const customTimeException = new http_exception_1.HTTPException(408, {
    message: "Request Timeout"
});
app.use("time", (0, timeout_1.timeout)(10000, customTimeException));
// app.use("/webhook",handleStripeWebhook )
// Utility function to convert date fields
function convertDateFields(body, fields) {
    fields.forEach(field => {
        if (body[field]) {
            const date = new Date(body[field]);
            if (!isNaN(date.getTime())) {
                body[field] = date.toISOString();
            }
        }
    });
}
// Example endpoint demonstrating date conversion
app.post('/api/example', async (c) => {
    const body = await c.req.json();
    convertDateFields(body, ['booking_date', 'return_date', 'createdAt', 'updatedAt']);
    // Process the request with the converted date fields
    return c.json({ message: 'Dates converted successfully', body });
});
// Routers
app.route("/api", user_router_1.userRouter);
app.route("/api", contact_router_1.contactRouter);
app.route("/api", department_router_1.departmentRouter);
app.route("/api", Appointment_router_1.appointmentRouter);
app.route("/api", doctors_routes_1.doctorsRouter);
// app.route("/api", customerSupportRouter)
// app.route("/api", authenticationRouter)
// app.route("/api/auth", authRouter)
app.get("/", async (c) => {
    try {
        let html = await (0, promises_1.readFile)("./index.html", 'utf-8');
        return c.html(html);
    }
    catch (err) {
        return c.text(err.message, 500);
    }
});
// Not found handler
app.notFound((c) => {
    return c.text("Not Found", 404);
});
app.get('/metrics', printMetrics);
// app.get('/metrics', registerMetrics)
const port = 8000;
console.log(`Server is running on port ${port}`);
(0, node_server_1.serve)({
    fetch: app.fetch,
    port: Number(process.env.PORT) || 8000
});
