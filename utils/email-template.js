// utils/email-template.js

export const generateEmailTemplate = ({
  userName,
  subscriptionName,
  renewalDate,
  planName,
  price,
  paymentMethod,
  accountSettingsLink,
  supportLink,
  daysLeft,
}) => {
  const formattedDate = new Date(renewalDate).toLocaleDateString();

  return `
    <div style="
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background-color: #f4f6f8;
      padding: 20px;
      color: #333;
    ">
      <div style="
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        overflow: hidden;
      ">
        <div style="background-color: #007bff; color: white; padding: 20px; text-align: center;">
          <h1 style="margin: 0; font-size: 24px;">Subscription Reminder</h1>
        </div>
        <div style="padding: 30px;">
          <p>Hi <strong>${userName}</strong>,</p>
          <p>Your subscription <strong>${subscriptionName}</strong> (${planName}) is renewing in <strong>${daysLeft} day(s)</strong> on <strong>${formattedDate}</strong>.</p>

          <div style="margin: 20px 0; padding: 15px; background-color: #f0f4f8; border-left: 5px solid #007bff;">
            <p><strong>Subscription Details:</strong></p>
            <ul>
              <li>Price: ${price}</li>
              <li>Payment Method: ${paymentMethod}</li>
            </ul>
          </div>

          <p>Manage your subscription via your <a href="${accountSettingsLink}" style="color: #007bff; text-decoration: none;">Account Settings</a>.</p>
          <p>If you have questions, reach out to our <a href="${supportLink}" style="color: #007bff; text-decoration: none;">Support Team</a>.</p>

          <p style="margin-top: 30px;">Thanks,<br/>The Subscription Tracker Team</p>
        </div>

        <div style="background-color: #f4f6f8; text-align: center; padding: 15px; font-size: 12px; color: #777;">
          You are receiving this email because you have an active subscription.
        </div>
      </div>
    </div>
  `;
};

// Fully dynamic email templates
export const emailTemplates = [
  {
    label: "7 days before reminder",
    generateSubject: (data) => `Reminder: ${data.subscriptionName} Renews in 7 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 7 }),
  },
  {
    label: "5 days before reminder",
    generateSubject: (data) => `Reminder: ${data.subscriptionName} Renews in 5 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 5 }),
  },
  {
    label: "4 days before reminder",
    generateSubject: (data) => `Reminder: ${data.subscriptionName} Renews in 4 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 4 }),
  },
  {
    label: "2 days before reminder",
    generateSubject: (data) => `Reminder: ${data.subscriptionName} Renews in 2 Days!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 2 }),
  },
  {
    label: "1 day before reminder",
    generateSubject: (data) => `Final Reminder: ${data.subscriptionName} Renews Tomorrow!`,
    generateBody: (data) => generateEmailTemplate({ ...data, daysLeft: 1 }),
  },
];

// Helper to generate email content dynamically
export const getEmailContent = (template, props) => ({
  subject: template.generateSubject(props),
  html: template.generateBody(props),
});
