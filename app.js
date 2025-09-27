// C:\Users\abhir_56d9u3c\Desktop\Subscription-Management-System\app.js

import express from "express";
import cookieParser from "cookie-parser";
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';  

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded ({ extended:false }));
app.use(cookieParser());

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);

// Root route
app.get("/", (req, res) => {
  res.send("Welcome to the subscription tracker API!");
});

//  startup function
const startServer = async () => {
  try {
    await connectToDatabase(); // Connect to DB first
    app.listen(PORT, () => {
      console.log(` Subscription Tracker API running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

startServer();
