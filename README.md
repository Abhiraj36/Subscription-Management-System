# Subscription Tracker API

A Node.js + Express API to manage subscriptions and send automated renewal reminders via email.

# Features

Subscription Management
Add, update, delete, and view subscriptions.
Supports multiple payment methods, frequencies, and categories.

Automated Email Reminders
Sends customizable emails to users before subscription renewal.
Fully dynamic templates with days-left countdown.

User Authentication
JWT-based login & registration system.
Role-based access for users/admins.

Workflow Management
Handle recurring subscription notifications automatically.

Security
Bot detection & request fingerprinting via Arcjet middleware.
Rate limiting and access control.


| Layer      | Technology             |
| ---------- | ---------------------- |
| Backend    | Node.js, Express       |
| Database   | MongoDB Atlas          |
| Email      | Nodemailer             |
| Security   | Arcjet Middleware, JWT |
| Deployment | Render                 |

# ⚙️ API Endpoints

Auth

POST /api/v1/auth/register – Register a new user
POST /api/v1/auth/login – Login & get JWT

Users

GET /api/v1/users – List users (admin only)
GET /api/v1/users/:id – Get user info

Subscriptions

GET /api/v1/subscriptions – List all subscriptions
POST /api/v1/subscriptions – Add new subscription
GET /api/v1/subscriptions/:id – Get subscription by ID
PUT /api/v1/subscriptions/:id – Update subscription
DELETE /api/v1/subscriptions/:id – Delete subscription

Workflows

GET /api/v1/workflows – List scheduled workflows
POST /api/v1/workflows – Create new workflow

Note: Include User-Agent header when testing POST/PUT endpoints to bypass bot detection middleware.

<img width="1541" height="762" alt="Screenshot 2025-09-28 210256" src="https://github.com/user-attachments/assets/02013644-a7b0-43bb-88dc-d6169ce8df85" />


# 🛠 Installation
# Clone repo
git clone https://github.com/Abhiraj36/Subscription-Management-System.git
cd Subscription-Management-System

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
 Edit .env with your MongoDB URI, PORT, and email credentials

# Start server
npm run dev

Server will run at:
http://localhost:5500

# 🌐 Deployment

Deployed on Render: https://subscription-management-system-ypjp.onrender.com
Make sure MongoDB Atlas whitelist includes Render IPs (0.0.0.0/0 works temporarily).

config/             # Config files
  ├─ arcjet.js      # Arcjet bot detection setup
  ├─ env.js         # Environment variable constants
  ├─ nodemailer.js  # Nodemailer transporter & email account
  └─ upstash.js     # Optional cache / Redis setup

controllers/        # Route handlers
  ├─ auth.controller.js
  ├─ subscription.controller.js
  ├─ user.controller.js
  └─ workflow.controller.js

database/
  └─ mongodb.js     # MongoDB connection

middlewares/
  ├─ arcjet.middleware.js
  ├─ auth.middleware.js
  └─ error.middleware.js

models/
  ├─ subscription.model.js
  └─ user.model.js

routes/
  ├─ auth.routes.js
  ├─ subscription.routes.js
  ├─ users.routes.js
  └─ workflow.routes.js

utils/
  ├─ send-email.js
  └─ email-template.js

app.js              # Main server entry

# 💡 Notes

Arcjet middleware may block automated requests; include User-Agent for testing.
Email reminders are fully dynamic and customizable.
Works in development and production environments.
