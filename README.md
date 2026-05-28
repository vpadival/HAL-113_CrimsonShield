# 🩸 CrimsonShield — Real-Time Emergency Blood Coordination Platform

CrimsonShield connects hospitals, blood banks, and donors in real time during life-critical emergencies. It provides faster alerts, quicker responses, and helps save more lives.

## Features

### Donor Portal
- **Registration & Login** — Supabase-authenticated sign-up and login with geolocation capture
- **Dashboard** — View active blood requests, toggle availability status, and see recent donation history (all fetched live from the database)
- **Profile** — View and edit personal details synced with Supabase
- **Eligibility Updates** — Report temporary/permanent ineligibility with reason tracking, persisted to the database
- **Feedback** — Star-rated donation experience feedback saved to the `feedback` table
- **Rewards** — Gamified rewards unlocked based on donation count

### Admin (Hospital) Portal
- **Authenticated Login** — Supabase-authenticated admin sign-in with session guard on all admin pages
- **Dashboard** — Live stats (emergencies, donors, alerts, fulfilled cases) pulled from the database; real-time blood stock overview
- **Add Donor** — Manual entry or CSV bulk upload with validation, consent tracking, and eligibility checks; data persisted to Supabase
- **Find Blood (Contact Network)** — Search, filter, and request blood from hospitals, blood banks, and donors loaded from the database
- **Ambulance Tracking** — Live Leaflet.js map showing available donor locations from Supabase; simulated ambulance progress
- **Analytics** — Chart.js-powered dashboards with data pulled from Supabase (monthly requests, blood group distribution, request statuses)
- **Hospital Profile** — View and edit hospital details, persisted to Supabase

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend / Database:** [Supabase](https://supabase.com) (PostgreSQL + Auth + Realtime)
- **Maps:** [Leaflet.js](https://leafletjs.com) + OpenStreetMap
- **Charts:** [Chart.js](https://www.chartjs.org)
- **3D Landing:** [Three.js](https://threejs.org) (blood cell animation)

## Project Structure

```
HAL-113_CrimsonShield/
├── index.html              # Landing page with Three.js blood cell animation
├── js/
│   ├── supabase-config.js  # Shared Supabase client (single source of truth)
│   └── auth.js             # Session helpers, route guards, logout
├── donor/
│   ├── user-login.html     # Donor login (Supabase Auth)
│   ├── donor-sign.html     # Donor registration (Supabase Auth + donors table)
│   ├── donor-dashboard.html# Dashboard with live data
│   ├── donor-profile.html  # Profile view & edit
│   ├── donor-feedback.html # Feedback form (saved to DB)
│   ├── donor-rewards.html  # Gamified reward cards
│   └── update-health.html  # Eligibility status updates
├── admin/
│   ├── admin-login.html    # Admin login (Supabase Auth)
│   ├── admin-dashboard.html# Admin overview with live stats
│   ├── add-eligible-donor.html # Add donors manually or via CSV
│   ├── ambulance-tracking.html # Live map + ambulance progress
│   ├── analytics.html      # Charts dashboard
│   ├── contact-network.html# Blood search & request network
│   ├── admin-profile.html  # Hospital profile editor
│   └── donor-success.html  # Success confirmation page
├── .gitignore
└── README.md
```

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/vpadival/HAL-113_CrimsonShield.git
   cd HAL-113_CrimsonShield
   ```

2. Open `index.html` in a browser, or serve locally:
   ```bash
   npx serve .
   ```

3. The app uses a shared Supabase project. To use your own:
   - Create a project at [supabase.com](https://supabase.com)
   - Update `SUPABASE_URL` and `SUPABASE_KEY` in `js/supabase-config.js`
   - Create the required tables: `donors`, `feedback`, `blood_requests`, `hospitals`, `blood_stock`

## Supabase Tables

| Table | Key Columns |
|-------|-------------|
| `donors` | `id`, `user_id`, `name`, `phone`, `blood_group`, `latitude`, `longitude`, `is_available`, `gender`, `email`, `last_donation_date` |
| `feedback` | `id`, `user_id`, `rating`, `experience`, `comments`, `created_at` |
| `blood_requests` | `id`, `hospital_name`, `blood_group`, `units`, `status`, `created_at` |
| `hospitals` | `id`, `name`, `location`, `email`, `phone`, `admin_user_id` |
| `blood_stock` | `id`, `blood_group`, `units`, `hospital_id` |

## License

This project is for educational purposes.