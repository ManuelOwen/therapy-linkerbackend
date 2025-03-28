import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { prometheus } from '@hono/prometheus'
import "dotenv/config"
import { logger } from "hono/logger"
import { csrf } from "hono/csrf"
import { trimTrailingSlash } from 'hono/trailing-slash'
import { timeout } from "hono/timeout"
import { HTTPException } from 'hono/http-exception'
import { readFile } from 'fs/promises'
import {cors} from 'hono/cors'

// routers
import { userRouter } from './users/user.router'
import { appointmentRouter } from './Appointment/Appointment.router'
import { contactRouter } from './Contact/contact.router'
import { departmentRouter } from './department/department.router'
import { doctorsRouter } from './doctors/doctors.routes'


const app = new Hono()
const { printMetrics, registerMetrics } = prometheus()

// Middleware
app.use('*', cors())
app.use(logger())
app.use(csrf())
app.use(trimTrailingSlash())
const customTimeException = new HTTPException(408, {
  message: "Request Timeout"
})
app.use("time", timeout(10000, customTimeException))
// app.use("/webhook",handleStripeWebhook )

// Utility function to convert date fields
function convertDateFields(body: any, fields: string[]) {
  fields.forEach(field => {
    if (body[field]) {
      const date = new Date(body[field])
      if (!isNaN(date.getTime())) {
        body[field] = date.toISOString()
      }
    }
  })
}

// Example endpoint demonstrating date conversion
app.post('/api/example', async (c) => {
  const body = await c.req.json()
  convertDateFields(body, ['booking_date', 'return_date', 'createdAt', 'updatedAt'])
  
  // Process the request with the converted date fields
  return c.json({ message: 'Dates converted successfully', body })
})

// Routers
app.route("/api", userRouter)
app.route("/api", contactRouter)
app.route("/api", departmentRouter)
app.route("/api", appointmentRouter)
app.route("/api", doctorsRouter)
// app.route("/api", customerSupportRouter)
// app.route("/api", authenticationRouter)

// app.route("/api/auth", authRouter)

app.get("/", async (c) => {
  try {
    let html = await readFile("./index.html", 'utf-8')
    return c.html(html)
  } catch (err: any) {
    return c.text(err.message, 500)
  }
})

// Not found handler
app.notFound((c) => {
  return c.text("Not Found", 404)
})

app.get('/metrics', printMetrics)
// app.get('/metrics', registerMetrics)
const port = 8000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || 8000
})
