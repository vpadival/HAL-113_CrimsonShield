# 🩸 CrimsonShield — Real-Time Emergency Blood Coordination Platform

CrimsonShield connects hospitals, blood banks, and donors in real time during life-critical emergencies. It provides faster alerts, quicker responses, and helps save more lives.

## Features

### Donor Portal
- **Registration & Login** — Supabase-authenticated sign-up and login with geolocation capture
- **Dashboard** — View active blood requests, toggle availability, and see donation history (live from DB)
- **Profile** — View and edit personal details synced with Supabase
- **Eligibility Updates** — Report temporary/permanent ineligibility, persisted to the database
- **Feedback** — Star-rated donation experience feedback saved to the `feedback` table
- **Rewards** — Gamified reward cards unlocked based on fulfilled donation count

### Admin (Hospital) Portal
- **Authenticated Login** — Supabase-authenticated sign-in with session guard on all admin pages
- **Dashboard** — Live stats (donors, pending/fulfilled requests) with real-time blood stock overview
- **Add Donor** — Manual entry or CSV bulk upload with validation; data persisted to Supabase
- **Find Blood (Contact Network)** — Search, filter, and dispatch blood requests to donors and hospitals
- **Donor Dispatch & Map** — Live Leaflet.js map of available donors, dispatch modal, pending requests table
- **Analytics** — Chart.js dashboards with live data (monthly requests, blood group distribution, statuses)
- **Hospital Profile** — View and edit hospital details, persisted to Supabase

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript (vanilla)
- **Backend / Database:** [Supabase](https://supabase.com) (PostgreSQL + Auth)
- **Maps:** [Leaflet.js](https://leafletjs.com) + OpenStreetMap
- **Charts:** [Chart.js](https://www.chartjs.org)
- **Icons:** [Font Awesome 6](https://fontawesome.com)

## Project Structure

```
HAL-113_CrimsonShield/
├── index.html                   # Landing page
├── js/
│   ├── supabase-config.js       # Shared Supabase client — update URL & key here
│   └── auth.js                  # Session helpers, route guards, logout
├── donor/
│   ├── user-login.html          # Donor login
│   ├── donor-sign.html          # Donor registration
│   ├── donor-dashboard.html     # Live requests & donation history
│   ├── donor-profile.html       # Profile view & edit
│   ├── donor-feedback.html      # Feedback form
│   ├── donor-rewards.html       # Reward cards
│   └── update-health.html       # Eligibility status update
├── admin/
│   ├── admin-login.html         # Admin login
│   ├── admin-dashboard.html     # Live stats & blood stock
│   ├── add-eligible-donor.html  # Add donors manually or via CSV
│   ├── ambulance-tracking.html  # Donor dispatch map & pending requests
│   ├── analytics.html           # Charts dashboard
│   ├── contact-network.html     # Blood search & request network
│   ├── admin-profile.html       # Hospital profile editor
│   └── donor-success.html       # Success confirmation
├── .gitignore
└── README.md
```

## Setup

### 1. Clone the repo
```bash
git clone https://github.com/vpadival/HAL-113_CrimsonShield.git
cd HAL-113_CrimsonShield
```

### 2. Create a Supabase project
- Go to [supabase.com](https://supabase.com) and create a new project
- Go to **Project Settings → API** and copy your **Project URL** and **anon public key**
- Update `js/supabase-config.js`:
  ```js
  const SUPABASE_URL = "https://your-project.supabase.co";
  const SUPABASE_KEY = "your-anon-key";
  ```

### 3. Create the database tables
Paste the following into **Supabase → SQL Editor → Run**:

```sql
create table donors (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  name text, email text, phone text, gender text,
  blood_group text, latitude float, longitude float,
  is_available boolean default true,
  last_donation_date date,
  created_at timestamptz default now()
);

create table blood_requests (
  id uuid primary key default gen_random_uuid(),
  blood_group text,
  hospital_name text,
  units int default 1,
  status text default 'pending',
  urgency text default 'normal',
  donor_id text,
  created_at timestamptz default now()
);

create table hospitals (
  id uuid primary key default gen_random_uuid(),
  admin_user_id uuid references auth.users(id) on delete cascade,
  name text, address text, city text,
  phone text, email text,
  type text default 'hospital',
  status text default 'active',
  latitude float, longitude float,
  created_at timestamptz default now()
);

create table blood_stock (
  id uuid primary key default gen_random_uuid(),
  hospital_id uuid references hospitals(id) on delete cascade,
  blood_group text, units int default 0,
  updated_at timestamptz default now()
);

create table feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  rating int check (rating between 1 and 5),
  experience text, comments text,
  created_at timestamptz default now()
);

-- Seed blood stock
insert into blood_stock (blood_group, units) values
  ('A+',0),('A-',0),('B+',0),('B-',0),
  ('AB+',0),('AB-',0),('O+',0),('O-',0);
```

### 4. Create an admin user
- Go to **Supabase → Authentication → Users → Add User**
- Create a user with email + password — these are your admin login credentials
- Go to **Table Editor → hospitals** and add a row with that user's UUID as `admin_user_id`

### 5. Run the app
```bash
npx serve .
# then open http://localhost:3000
```

> ⚠️ Always serve via a local server (not `file://`) — browsers block outbound requests from local file paths.

## Supabase Tables

| Table | Key Columns |
|-------|-------------|
| `donors` | `id`, `user_id`, `name`, `email`, `phone`, `gender`, `blood_group`, `latitude`, `longitude`, `is_available`, `last_donation_date` |
| `blood_requests` | `id`, `blood_group`, `units`, `status`, `urgency`, `donor_id`, `created_at` |
| `hospitals` | `id`, `admin_user_id`, `name`, `address`, `city`, `phone`, `email`, `type` |
| `blood_stock` | `id`, `hospital_id`, `blood_group`, `units` |
| `feedback` | `id`, `user_id`, `rating`, `experience`, `comments`, `created_at` |

## CSV Donor Upload Format

The **Add Donor** page accepts CSV files with these columns:
```
name, email, phone, gender, blood_group, last_donation_date
```

## License

This project is for educational purposes.