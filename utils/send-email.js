// utils/send-email.js
import { accountEmail, transporter } from "../config/nodemailer.js";
import { emailTemplates, getEmailContent } from "./email-template.js";

export const sendReminderEmail = async ({
  to,
  type,
  subscription,
  accountSettingsLink,
  supportLink,
}) => {
  if (!to || !type) throw new Error("Missing required parameters");

  // Find the template
  const template = emailTemplates.find((t) => t.label === type);
  if (!template) throw new Error(`Invalid email type: ${type}`);

  // Prepare props for template
  const mailProps = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    paymentMethod: subscription.paymentMethod,
    renewalDate: subscription.renewalDate,
    accountSettingsLink,
    supportLink,
  };

  // Generate subject + HTML body
  const { subject, html } = getEmailContent(template, mailProps);

  // Nodemailer options
  const mailOptions = {
    from: accountEmail,
    to,
    subject,
    html,
  };

  // Send email with Promise wrapper
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("❌ Error sending email:", error);
        return reject(error);
      }
      console.log("✅ Email sent:", info.response);
      resolve(info);
    });
  });
};
