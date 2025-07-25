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
  Displays the total number of events recorded in the audit system.

- 👥 **Users with Actions** (`Unique Users`)
  Number of distinct users who have triggered logged events.

- 📆 **Last Update Timestamp**
  Shows the most recent time a user action occurred.

- 🥧 **Status Pie Chart**
  Real-time visualization of user activity status using a pie chart with percentage labels and a colored legend.

- 🌍 **Role-Based Access Control (RBAC)**
  Supports 4 user roles:

  - `Global Admin`: Full visibility and control across all regions.
  - `Regional Admin`: Manages data within their assigned region only.
  - `Sending Partner`: Access to sent transaction and limited logs.
  - `Receiving Partner`: Access to incoming transaction data.

- 🔄 **Real-Time Audit Logging**
  Every user action is logged to the database with:

  - `user`
  - `action`
  - `timestamp`
  - `status`

- 📦 **Transaction Module**
  View and manage all transaction-related data including amount, status, region, timestamps, and type (USD ↔ USDC).

- 💹 **Cybrid Mock API Integration**
  Fetch real-time exchange rate for USD/USDC:

  ```http
  GET /rates?from=USD&to=USDC → { rate: 1.0 }
  ```

- 📊 **Visual Graphs & Analytics**
  Integrated charts (bar, pie, line) to summarize activity, regional usage, transaction distribution, and volume trends.

- 📁 **Dynamic, Paginated Tables**
  Tables support:

  - Server-side pagination
  - Search and filters (by user, date range, role, region)
  - Custom sorting (by date, actions, status)

- 🔍 **Advanced Filter & Search**
  Robust client-side filtering and real-time search for logs and users by:

  - Region
  - Role
  - Status
  - Date range

- 🔒 **Security**

  - JWT-based authentication
  - Express middleware for per-route RBAC control
  - HTTP headers hardened using `helmet`

- ⚙️ **Seed Database on App Startup**
  Automatically seeds a mock dataset on first launch for quick testing, including:

  - Users by role
  - Regions
  - Transactions
  - Audit logs

- 🐳 **Docker-Compose Support**
  One-command startup using Docker Compose:

  ```bash
  docker-compose up --build
  ```

  Services included:

  - Node.js backend
  - React frontend
  - MongoDB

- 👨‍💻 **Developer Tools**

  - Live reload using `nodemon`
  - ESLint + Prettier for linting and formatting
  - `.env` support for API keys and secrets

---

## 📦 Tech Stack

- **React 18**
- **Material-UI (v5)**
- **Recharts** – for chart rendering

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

## 🧩 Components Overview

### `StatusPieChart.jsx`

Renders a pie chart showing the breakdown of different transaction statuses (e.g., `completed`, `pending`, `rejected`).

```jsx
<Pie
  data={pieData}
  cx="50%"
  cy="50%"
  outerRadius={100}
  fill="#8884d8"
  dataKey="value"
  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
/>
```

Colors:

- ✅ Completed: `#4CAF50`
- ⏳ Pending: `#FFC107`
- ❌ Rejected: `#F44336`

---

### `StatCard.jsx`

Reusable card component to display:

- Total Logs
- Users with Actions
- Last Updated Date

```jsx
<StatCard title="Total Logs" value={totalLogs} color="primary" />
<StatCard title="Users with Actions" value={usersWithActions} color="secondary" />
```

---

### `KycDashboard.jsx`

Main component that:

- Processes `logs` data
- Extracts unique users
- Renders `StatCard` and `StatusPieChart`

#### Props:

```js
logs = [
  {
    user: { _id: 'user123', name: 'John' },
    status: 'completed',
    createdAt: '2024-07-24T10:15:30Z',
    ...
  },
  ...
]
```

#### Derived Stats:

```js
const totalLogs = logs.length;
const usersWithActions = new Set(logs.map((log) => log.user?._id)).size;
const lastUpdated = logs[0]?.createdAt;
```

---

## 🖼 Screenshot

> _[Add a screenshot of your dashboard UI here]_  
> Example:  
> ![Dashboard Screenshot](./screenshot.png)

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
