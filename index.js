import express from 'express'
import authRoutes from './routers/auth_routes.js'
import cors from 'cors'

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
//Receive the data in json format
app.use(express.json())

//Global Middleware
app.use((req, res, next) => {
    console.log("Request Received")
    next();
})

app.use('/api/auth', authRoutes)

export default app