# Leave Management System

A role-based **Leave Management Prototype** built with **React (Class Components), MobX, Context API, and JSON Server**.  
Employees can apply for leaves, Managers can approve/reject team requests, and Admins can view a dashboard with statistics and charts.

---

## 🚀 Features

- **Authentication simulation** with role-based access (Employee, Manager, Admin).
- **Employee View**: Apply Leave (with date validations), My Leaves.
- **Manager View**: View team leave requests, approve/reject actions, filters by employee & status.
- **Admin View**: Dashboard with total leaves, approved/pending/rejected counts, and per-employee usage chart.
- **Filters**: URL-driven → persist across refresh and sharable.
- **Responsive Design**: Inline styles (mobile-first).
- **Animations**: Approve/Reject actions highlight rows smoothly.
- **Mock API**: JSON Server with `db.json` for users & leaves data.

---

## 🛠️ Tech Stack

- **Frontend**: React (Class Components), React Router v6.
- **State Management**: MobX + Context API.
- **Mock API**: JSON Server.
- **Styling**: Inline styles only (consistent, responsive).

---

## 📂 Project Structure

```
leave-management-system/
│── frontend/                    # React app
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── stores/
│   │   └── context/
│
│── mock-api/                    # JSON Server mock backend
│   ├── db.json                  # mock data (users, leaves)
│
└── README.md
```

---

## ⚡ Setup Instructions

**Prerequisites:** Node.js v22.14.0 (npm v10.9.2) - This project was built and tested with this version.

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yogeekabhi/leave-management-system.git
cd leave-management-system
```

### 2️⃣ Install Dependencies

**Frontend:**

```bash
cd frontend
npm install
```

**Mock API:**

```bash
cd ../mock-api
npm install
```

### 3️⃣ Run Mock API

You can run directly:

```bash
npx json-server --watch db.json --port 5000
```

Mock API runs on `http://localhost:3000` as `"proxy": "http://localhost:5000"` in package.json in frontend 
with endpoints:

- `/users`
- `/leaves`

### 4️⃣ Run Frontend

Open a new terminal:

```bash
cd frontend
npm start
```

Frontend runs on `http://localhost:3000` (or another available port).

---

## 📖 Usage

- Login using credentials from `db.json` (admin/manager/employee).
- **Employee** → Apply new leaves, view My Leaves (status shown).
- **Manager** → View & approve/reject team requests, filter by employee/status.
- **Admin** → Dashboard with summary cards and per-employee leave usage chart (out of 24).

---

## 📌 Assumptions

- Each employee has 24 annual leaves.
- Authentication is mocked (no real sessions/JWT).
- Manager sees only employees mapped with their `managerId`.
- Admin dashboard is global (all employees).

---

## ⚠️ Limitations

- State persistence limited (localStorage used in some cases).
- Passwords stored in plain text for mock API.
- JSON Server = no real DB; all data resets when server restarts.

---

## ✨ Additional Features

- Inline responsive UI with mobile-first design.
- Animations on approve/reject actions for better UX.
- Slug-based filters in URLs (instead of query params).
- Simple route guard (ProtectedRoute) for authentication checks.

---

## ✅ Submission Notes

- Repository contains `frontend` + `mock-api` folders.
- Setup & run instructions provided (see above).
- Documented assumptions, limitations, and additional features.

---

## 🎮 Quick Demo

### 🔑 Sample Login Credentials

Use these credentials from `db.json`:

**Admin**
- Employee ID: `100`
- Email: `robert@company.com`
- Password: `rob123`

**Manager**
- Employee ID: `200`
- Email: `scarlett@company.com`
- Password: `scar123`

**Employee**
- Employee ID: `300`
- Email: `peter@company.com`
- Password: `pet123`

👉 You can also open `mock-api/db.json` and try other users' credentials (Admins, Managers, Employees) to check different scenarios.

Cheers! 😊
