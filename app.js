// C:\Users\abhir_56d9u3c\Desktop\Subscription-Management-System\app.js

import express from "express";
import { PORT } from './config/env.js';
import connectToDatabase from './database/mongodb.js';  // ✅ use default import

import authRouter from './routes/auth.routes.js';
import userRouter from './routes/users.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

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
