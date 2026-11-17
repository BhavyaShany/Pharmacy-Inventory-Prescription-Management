# Pharmacy Inventory & Prescription Management

A full-stack starter application with:
- React + Vite frontend (JavaScript, CSS, Node.js tooling)
- FastAPI backend with JWT authentication
- MySQL database
- Inventory, medicines, customers, suppliers, prescriptions, and dashboard
- Indian demo names and commonly used medicine catalogue

> **Demo-data notice:** Seed medicines and stock levels are for software demonstration only. They are not prescribing guidance. Verify every medicine, formulation, strength, schedule, batch, expiry, and price with an authorised pharmacist and current Indian regulatory requirements before real use. Prescription-only medicines must only be dispensed against a valid prescription.

## Project structure

```text
pharmacy-inventory-prescription-management/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   ├── database.py
│   │   ├── main.py
│   │   ├── models.py
│   │   └── schemas.py
│   ├── .env.example
│   ├── .env (local only, not committed)
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── schema.sql
└── docker-compose.yml
```

## Requirements

- Python 3.10+
- Node.js 18+
- Docker Desktop (recommended) or MySQL 8+

## 1. Start MySQL

From the project root:

```bash
docker compose up -d db
```

This creates database `pharmacy_db` and imports the demo schema and seed data on first startup. MySQL is exposed on host port `3307` (container port `3306`), which is what `backend/.env.example` uses.

If you already have MySQL, run `database/schema.sql` manually and update the backend `.env`.

## 2. Start FastAPI backend

Windows PowerShell:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

macOS/Linux activation:

```bash
source .venv/bin/activate
```

Backend: `http://localhost:8000`  
Interactive API docs: `http://localhost:8000/docs`

Change `SECRET_KEY` in `.env` before deployment. The default demo admin is created automatically if the database is empty:

- Email: `admin@shreepharmacy.in`
- Password: `Admin@123`

Change this password immediately and do not use demo credentials in production.

## 3. Start frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually `http://localhost:5173`.

## Main workflows

- Sign in using the demo admin account.
- Dashboard shows inventory totals, low-stock items, and recent prescriptions.
- Inventory lets you search medicines and add stock items.
- Customers and suppliers are listed from MySQL.
- Prescriptions can be recorded with customer, doctor, and medicine details.
- Backend endpoints require a bearer token except `/api/auth/login` and `/api/health`.

## API overview

| Method | Endpoint | Purpose |
|---|---|---|
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/dashboard` | Dashboard summary |
| GET/POST | `/api/medicines` | List/add medicines |
| GET/POST | `/api/inventory` | List/add inventory batches |
| GET | `/api/customers` | List customers |
| GET | `/api/suppliers` | List suppliers |
| GET/POST | `/api/prescriptions` | List/create prescriptions |

## Before production

Add role-based access control, password reset, audit logs, refresh-token rotation, rate limiting, HTTPS, backups, migration management, input/security testing, and proper prescription image/document handling. Review applicable Indian pharmacy, privacy, and data-retention requirements. This starter is not a certified pharmacy-management or clinical system.
