# 🧾 KYC Dashboard

A clean and responsive dashboard built with **React** **Vite** and **Material-UI**, designed to visualize user activity and logs in a KYC (Know Your Customer) system. It provides key statistics and a visual breakdown of user interaction with the system.

---

Here's the updated **`README.md` features section** tailored to the **Multi-Region KYC Dashboard** project, highlighting all the requested functionalities in a professional and polished format. It now includes:

- 👷 Infrastructure (Docker, seed DB)
- 🔒 Security (Helmet, RBAC)
- 📦 Dev tools (Nodemon, logging)
- 📈 Features relevant to real-world fintech dashboards

---

## 📊 Features

- ✅ **Total number of user actions** (`Total Logs`)
- Displays the total number of events recorded in the audit system.

- 👥 **Users with Actions** (`Unique Users`)

  - Number of distinct users who have triggered logged events.

- 📆 **Last Update Timestamp**
  Shows the most recent time a user action occurred.

- 🥧 **Status Pie Chart**
- Real-time visualization of user activity status using a pie chart with percentage labels and a colored legend.

- 🌍 **Role-Based Access Control (RBAC)**
  Supports 4 user roles:

  - `Global Admin`: Full visibility and control across all regions.
  - `Regional Admin`: Manages data within their assigned region only .
  - `Sending Partner`: Access to sent transaction and limited logs.
  - `Receiving Partner`: Access to incoming transaction data.

  - `Senders and Receivers`
    - Can perform transactions
  - `Admins (Global/Regional)`
    - View Users Dashboard
    - View Transactions Dashboard
    - View Audit Logs Dashboard

- 📦 **Transaction Module**
- View and manage all transaction-related data including amount, status, region, timestamps, and type (USD ↔ USDC).

- 💹 **Cybrid Mock API Integration**

  - Fetch real-time exchange rate for USD/USDC:

  ```http
  GET /rates?from=USD&to=USDC → { rate: 1.0 }
  ```

- 📊 **Visual Graphs & Analytics**

  - Integrated charts (bar, pie, line) to summarize activity, regional usage, transaction distribution, and volume trends.

- 🔐 **Authentication & Authorization**

  - JWT-based login and protected routes
  - Password hashing with bcrypt
  - Role-based access (Admin, Sender, Receiver)

- 📊 **Dashboards**

  - Role-specific dashboards:
  - Admin: Access all dashboards (Users, Transactions, Audit Logs)
  - Sender/Receiver: Access limited dashboard with transaction capabilities

- 🔔 **Notifications & UX**

  - react-toastify for toast notifications (login success, transaction done, errors)

- 🛡️ **Real-Time Audit Logging**

  - Logs user actions such as login, transactions, etc.
  - Each log includes:
  - Who performed the action `user`
  - What action occurred `action`
  - When it happened `Date`
  - about action in details `Details`

- 📁 **Dynamic, Paginated Tables**
  Tables support:

  - pagination
  - Search and filters (by user, date range, role, region)

- 🔍 **Advanced Filter & Search**

  - Robust client-side filtering and real-time search for logs and users by:

  - Region
  - Role
  - Status
  - Date range

- 🔒 **Security**

  - JWT-based authentication
  - Express middleware for per-route RBAC control
  - HTTP headers hardened using `helmet`

- ⚙️ **Seed Database on App Startup**

  - Automatically seeds a mock dataset on first launch for quick testing, including:

  - Users by role
  - Regions
  - Transactions
  - Audit logs

- 🐳 **Docker-Compose Support**

  - One-command startup using Docker Compose:

  ```bash
  docker-compose up --build
  ```

  Services included:

  - Node.js backend
  - React frontend
  - MongoDB

- 👨‍💻 **Developer Tools**

  - Live reload using `nodemon`
  - `.env` support for API keys and secrets

---

## 📁 Folder Structure

```
kyc-dashboard/
├── client/
├   ├── src/
├   ├──── App.jsx
├   └──── theme.jsx
├   ├──── components/
├   │     ├── audit/
├   │     ├    ├── AuditLogsChart.jsx
├   │     ├    ├── AuditLogsStats.jsx
├   │     ├    ├── AuditLogsTable.jsx
├   │     ├── login/
├   │     ├    ├── LoginForm.jsx
├   │     ├── transactions/
├   │     ├    ├──── TransactionCharts
├   │     ├    ├      ├── AmountLineChart.jsx
├   │     ├    ├      ├── RegionBarChart.jsx
├   │     ├    ├      ├── StatusPieChart.jsx
├   │     ├    ├      ├── TopSendersChart.jsx
├   │     ├    ├── AddTransactionDialog.jsx
├   │     ├    ├── AnalyticsDashboard.jsx
├   │     ├    ├── TransactionsTable.jsx
├   │     ├── users/
├   │          ├── AllUserManagementComponents.jsx
├   │          ├── RegionBarChart.jsx
├   │          ├── StatsCard.jsx
├   │          ├── UsersTable.jsx
├   │
├   ├──── page/
├   │     ├── AuditLogs.jsx
├   │     ├── Dashboard.jsx
├   │     ├── Home.jsx
├   │     ├── Login.jsx
├   │     ├── Setting.jsx
├   │     ├──Transactions.jsx
├   │     ├── UsersManagement.jsx
├   ├──── utils/
├   │     ├── Colors.jsx
├   │     ├── motion.jsx
├   ├──── context/
├   │     ├── Setting.jsx
├   │     ├──Transactions.jsx
├   │     ├── UsersManagement.jsx
├   ├──── routes/
├         ├── Approuter.jsx
├
├server/
├── src/
│   ├── controllers/
│   │   ├── audit.js
│   │   ├── auth.js
│   │   └── transactions.js
│   ├── middleware/
│   │   └── role.js
│   ├── models/
│   │   ├── AuditLog.js
│   │   ├── Transaction.js
│   │   └── User.js
│   ├── routes/
│   │   ├── audit.js
│   │   ├── auth.js
│   │   └── transactions.js
│   ├── seedDB.js
│   ├── index.js
├── .env
├── package.json
├── docker-compose.yml
```

## 🖼 Screenshot

<img width="1902" height="862" alt="Image" src="https://github.com/user-attachments/assets/05afd086-b43c-4eb4-9c9a-07ee1430a750" />
<img width="1899" height="865" alt="Image" src="https://github.com/user-attachments/assets/98d9db5d-63f4-46f3-93f2-ec5ca70bc53f" />
<img width="670" height="796" alt="Image" src="https://github.com/user-attachments/assets/8f968f81-8349-4d95-9763-a683dbb3c47e" />
<img width="1915" height="800" alt="Image" src="https://github.com/user-attachments/assets/8677a3c7-e0c7-4570-813c-56381b97f7c0" />
<img width="1916" height="793" alt="Image" src="https://github.com/user-attachments/assets/acd0e1a7-bc26-4951-b91d-7406a3dd6af4" />
<img width="1910" height="926" alt="Image" src="https://github.com/user-attachments/assets/09c52adb-b753-45d4-820f-110ea2595e9b" />
<img width="1907" height="925" alt="Image" src="https://github.com/user-attachments/assets/7f1f5df8-bae0-4e05-8856-f2beba3b949b" />
<img width="1901" height="802" alt="Image" src="https://github.com/user-attachments/assets/4dbc7421-54c5-4ea1-87a6-0d3904be43e2" />
<img width="1899" height="800" alt="Image" src="https://github.com/user-attachments/assets/e56e1a93-f261-4398-812b-c4587d453ea2" />
<img width="1575" height="793" alt="Image" src="https://github.com/user-attachments/assets/92240369-a817-4f8c-bec3-9c659d0b7028" />
<img width="1574" height="753" alt="Image" src="https://github.com/user-attachments/assets/fa7f42d4-8a36-46f4-98f4-059ce96d3cb9" />
<img width="1900" height="789" alt="Image" src="https://github.com/user-attachments/assets/b3de469c-0404-494d-a631-ea85960f6fdd" />
<img width="1898" height="801" alt="Image" src="https://github.com/user-attachments/assets/7eaefdf5-deb3-423b-b49f-b51bc0c45379" />
<img width="1584" height="886" alt="Image" src="https://github.com/user-attachments/assets/12f9b422-3930-42fe-9643-abbb5ba77b15" />
---

# KYC Dashboard

This is a full-stack KYC (Know Your Customer) Dashboard application, designed to manage and track user verification processes. It consists of a backend server and a frontend client, built with modern technologies to ensure performance, scalability, and maintainability.

## 🧠 Project Structure

- **Server**: `kyc-dashboard-server` (Node.js, Express, MongoDB)
- **Client**: `kyc-dashboard-client` (React, Vite, MUI)

## 🚀 Getting Started

### Prerequisites

- Node.js (v22)
- MongoDB

---

### 🧠 Used Technologies

#### 🖥️ Backend

- **Node.js** — JavaScript runtime
- **Express.js** — Web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT-based authentication
- **dotenv** — Environment variables
- **helmet** — Security middleware
- **cors** — Cross-Origin Resource Sharing
- **express-rate-limit** — Rate limiting middleware
- **morgan** — HTTP request logger
- **nodemon** — Development tool for auto-restarting the server

---

#### 🌐 Frontend

- **React** — JavaScript library for building UIs
- **Vite** — Next-generation frontend tooling
- **React Router DOM** — Routing library for React
- **MUI (Material-UI)** — UI component library
- **Emotion** — CSS-in-JS styling solution
- **Framer Motion** — Animation library
- **Recharts** — Charting library for React
- **Axios** — HTTP client
- **react-toastify** — Notification library for toast messages
- **redux** — State management Library

### Installation

1. Clone the repository:

```bash
git clone https://github.com/HebaAli48/kyc-dashBoard.git
cd kyc-dashboard
```

---

### 🚀 Start with Docker

Make sure Docker and Docker Compose are installed.

```bash
# Build and run the app
docker-compose up --build
```

This will:

- Start the MongoDB service
- Run the backend server with automatic DB seeding
- Launch the frontend React app
- Expose ports (default: Frontend on 5173, Backend on 5000, MongoDB on 27017)

---

### ⚙️ Manual Local Development (Without Docker)

#### 1. Client (React)

```bash
cd client
npm install
npm run dev
```

Runs the React app on [http://localhost:5173](http://localhost:5173)

#### 2. Server (Node/Express)

```bash
cd ../server
npm install
npm run dev
```

Runs the Express server on [http://localhost:5000](http://localhost:5000)

---

## 🧑‍💻 Author

Made with ❤️ by Heba
[https://heba-portfolio-new.netlify.app/](https://heba-portfolio-new.netlify.app/)

---
