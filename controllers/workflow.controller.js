// workflow.controller.js
import dayjs from "dayjs";
import Subscription from "../models/subscription.model.js";
import { createRequire } from "module";
import { sendReminderEmail } from "../utils/send-email.js";

const require = createRequire(import.meta.url);
const { serve } = require("@upstash/workflow/express");

const REMINDERS = [7, 5, 2, 1]; // days before renewal

export const sendReminders = serve(async (context) => {
  const { subscriptionId } = context.requestPayload;

  const subscription = await Subscription.findById(subscriptionId).populate(
    "user",
    "name email"
  );
  if (!subscription || subscription.status !== "active") return;

  const renewalDate = dayjs(subscription.renewalDate);
  if (renewalDate.isBefore(dayjs())) {
    console.log(
      `Renewal date has passed for subscription: ${subscriptionId}. Stopping workflow.`
    );
    return;
  }

for (const daysBefore of REMINDERS) {
  // Fix singular/plural
  const templateLabel = `${daysBefore} day${daysBefore > 1 ? "s" : ""} before reminder`;

  if (process.env.NODE_ENV === "development") {
    console.log(`DEV: Sending "${templateLabel}" email now`);
    await sendReminderEmail({
      to: subscription.user.email,
      type: templateLabel,
      subscription,
      accountSettingsLink: "http://localhost:5500/account",
      supportLink: "http://localhost:5500/support",
    });
  } else {
    const reminderDate = renewalDate.subtract(daysBefore, "day");
    if (reminderDate.isAfter(dayjs())) {
      await sleepUntilReminder(context, templateLabel, reminderDate);
      await triggerReminder(context, templateLabel, subscription, daysBefore);
    }
  }
}


});

const fetchSubscription = async (context, subscriptionId) => {
  return await context.run("get subscription", async () => {
    return Subscription.findById(subscriptionId).populate("user", "name email");
  });
};

const sleepUntilReminder = async (context, label, date) => {
  console.log(`Sleeping until ${label} reminder at ${date.toISOString()}`);
  await context.sleepUntil(label, date.toDate());
};

const triggerReminder = async (context, label, subscription, daysBefore) => {
  return await context.run(label, async () => {
    console.log(`Triggering ${label} reminder`);

    // Fix singular/plural
    const templateType = `${daysBefore} day${daysBefore > 1 ? "s" : ""} before reminder`;

    await sendReminderEmail({
      to: subscription.user.email,
      type: templateType,
      subscription,
      accountSettingsLink: "http://localhost:5500/account",
      supportLink: "http://localhost:5500/support",
    });
  });
};

