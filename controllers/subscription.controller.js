import dayjs from 'dayjs';
import Subscription from '../models/subscription.model.js';
import { workflowClient } from '../config/upstash.js';

// Create a new subscription and trigger workflow
export const createSubscription = async (req, res, next) => {
  try {
    const startDate = req.body.startDate ? new Date(req.body.startDate) : new Date();
    const renewalDate = req.body.renewalDate
      ? new Date(req.body.renewalDate)
      : dayjs(startDate).add(1, 'month').toDate();

    const subscription = await Subscription.create({
      ...req.body,
      startDate,
      renewalDate,
      user: req.user._id,
    });

    // Capture workflow trigger response
    const workflowResponse = await workflowClient.trigger({
      url: 'http://localhost:5500/api/v1/workflows/subscription/reminder',
      method: 'POST',
      body: { subscriptionId: subscription._id },
      headers: { 'content-type': 'application/json' },
      retries: 0,
    });

    // Return subscription + workflowRunId
    res.status(201).json({
      success: true,
      data: subscription,
      workflowRunId: workflowResponse.workflowRunId,
    });
  } catch (e) {
    next(e);
  }
};

// Fetch all subscriptions for a user
export const getUserSubscriptions = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      return res.status(403).json({ success: false, message: 'You are not the owner of this account' });
    }

    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (e) {
    next(e);
  }
};
