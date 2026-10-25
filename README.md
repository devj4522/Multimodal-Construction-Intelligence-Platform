# ConstructAI - Multimodal Construction Intelligence Platform

[![FastAPI](https://img.shields.io/badge/FastAPI-0.110+-009688.svg?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-18.3+-61DAFB.svg?logo=react&logoColor=black)](https://reactjs.org)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB.svg?logo=python&logoColor=white)](https://python.org)
[![Vite](https://img.shields.io/badge/Vite-5.4+-646CFF.svg?logo=vite&logoColor=white)](https://vitejs.dev)
[![Multimodal AI](https://img.shields.io/badge/Multimodal-Vision%20%2B%20LLM-FF7600.svg)](https://groq.com)

**ConstructAI** is an enterprise-grade, multimodal decision-support platform designed to assist construction project managers, structural engineers, safety officers, and estimators across the entire lifecycle of capital construction projects.

By bridging visual data (on-site photos, structural crack captures, drone imagery) with project specifications and civil engineering codexes (OSHA 1926, IS 456:2000, NBC 2016), ConstructAI delivers real-time hazard detection, automated BOQ calculations, Indian Rupee (₹ INR) valuation forecasts, and weather-aware risk mitigation.

---

## 🏗️ Technical Architecture

```
               ┌────────────────────────────────────────────────────────┐
               │         React.js Frontend (Command Center UI)          │
               │  - Dark Obsidian / Construction Orange Glass Theme     │
               │  - Lucide Icons + Framer Motion Micro-Interactions     │
               │  - Axios Client with Strict JSON Contract Bindings     │
               └──────────────────────────┬─────────────────────────────┘
                                          │ HTTP REST Requests
                                          ▼
               ┌────────────────────────────────────────────────────────┐
               │          FastAPI Application Server (Python 3)          │
               │  - Asynchronous Request Routing & CORS Middleware       │
               │  - Base64 Multipart Image Preprocessing                │
               │  - Pydantic Schema Validation & Fallback Generators    │
               └──────────────────────────┬─────────────────────────────┘
                                          │
                 ┌────────────────────────┴────────────────────────┐
                 ▼                                                 ▼
   ┌───────────────────────────┐                     ┌───────────────────────────┐
   │  Multimodal Vision Engine │                     │  Civil Codex & Economics  │
   │  - Site Hazard Detection  │                     │  - IS 456 / OSHA 1926     │
   │  - Crack Severity Scoring │                     │  - Indian Rupee BOQ &     │
   │  - PPE Compliance Audit   │                     │    Real Estate Valuation  │
   └───────────────────────────┘                     └───────────────────────────┘
```

---

## 🚀 Key Modules & Capabilities

### 1. 🛡️ Site Safety Monitor (`/api/safety-monitor`)
* Ingests site observations, daily logs, and site photos.
* Analyzes worker posture, scaffolding integrity, and PPE compliance (hard hats, high-vis vests, fall protection).
* Maps detected anomalies against OSHA 1926 and IS 4014 regulations.
* Issues prioritized corrective directives for site superintendents.

### 2. ⚡ Structural Crack Diagnosis (`/api/crack-detection`)
* Multimodal evaluation of structural fractures from high-resolution imagery.
* Classifies crack geometry (shear, hairline, thermal shrinkage, settlement).
* Assesses severity (Minor, Moderate, Severe) and computes structural risk.
* Recommends engineering remediation (low-viscosity epoxy injection, CFRP carbon wraps).

### 3. 🏢 Real Estate Estimator (`/api/real-estate-valuation`)
* Contextual pricing intelligence calibrated for Indian real estate markets.
* Evaluates location, super built-up area, building lifecycle age, and infrastructure.
* Returns estimated market value in **₹ INR (Lakhs / Crores)**, price per sq.ft, and gross rental yield potential.

### 4. 📋 Construction Project Planner (`/api/project-planner`)
* Transforms project briefs (e.g. *"20x50 slab construction"*) into actionable plans.
* **Material Estimator (BOQ):** Generates concrete volume (m³), cement bags, M-sand, aggregate, and TMT rebar (Fe550D) weights.
* **Cost Estimator:** Material, labour, finishing, and total budget breakdown.
* **Timeline Schedule:** Phase-wise milestone Gantt roadmap.

### 5. 🤖 Construction Domain Chatbot (`/api/chatbot`)
* Conversational AI copilot trained on civil engineering standards.
* Delivers immediate guidance for curing times, slump cone limits, and concrete mix design.
* Includes dynamic quick suggestion chips.

### 6. 📅 Daily Site Assistant (`/api/site-assistant`)
* Daily shift coordinator based on activity, available labour count, and site conditions.
* Generates prioritized daily checklists, mandatory PPE verification, and operational risk warnings.

### 7. 🌦️ Weather-Aware Advisory (`/api/weather-advisor`)
* Meteorological risk simulation for weather-critical operations (slab pouring, crane lifts).
* Delivers unambiguous **GO / NO-GO / PROCEED WITH CAUTION** operational verdicts.
* Details precipitation hazards, electrical risks, and mitigation measures.

### 8. 📚 Construction Knowledge Assistant (`/api/knowledge-assistant`)
* Searchable codex covering **Safety**, **Technical Techniques**, and **Document Generation**.
* References IS 456:2000, SP 34, NBC 2016, and OSHA regulations.

---

## 🛠️ Tech Stack & Dependencies

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, Vite 5, Lucide React Icons, Framer Motion, Axios |
| **Backend** | Python 3.9+, FastAPI, Uvicorn, Pydantic v2, Python-Multipart |
| **AI Integration** | Groq SDK / Multimodal Vision LLM / Dual-Layer Fallback Engine |
| **Design System** | Obsidian Dark Theme, Construction Orange (`#FF7600`), JetBrains Mono |

---

## ⚙️ Quick Start Installation Guide

### Prerequisites
* **Python 3.9+**
* **Node.js 18+ & npm**

### 1. Clone & Setup
```bash
git clone https://github.com/your-username/construct-ai.git
cd construct-ai
```

### 2. Run with One-Click Launcher (Windows)
Double-click `run_dev.bat` in the root folder, OR run:
```powershell
.\run_dev.bat
```

### 3. Or Run Manually:

#### Backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
Backend API will be accessible at: `http://localhost:8000`  
Swagger Documentation: `http://localhost:8000/docs`

#### Frontend:
```bash
cd frontend
npm install
npm run dev
```
Frontend Web App will be accessible at: `http://localhost:5173`

---

## 🔌 API Reference & Endpoints

| Endpoint | Method | Payload / Form | Output Description |
| :--- | :--- | :--- | :--- |
| `/api/safety-monitor` | `POST` | `text`, `image` (opt), `document` (opt) | Hazards, Risk level, PPE audit, OSHA codes |
| `/api/crack-detection` | `POST` | `text`, `image` (opt) | Crack type, Severity, Probable causes, Remediation |
| `/api/real-estate-valuation` | `POST` | `location`, `area`, `property_type`, `building_age`, `amenities` | Valuation in ₹ INR, Price/sqft, Rental yield |
| `/api/project-planner` | `POST` | `{ "desc": "..." }` | BOQ materials, Cost breakdown, Phase schedule |
| `/api/chatbot` | `POST` | `{ "query": "..." }` | Answer text, Action suggestion chips |
| `/api/site-assistant` | `POST` | `{ "activity", "labour_count", "site_condition" }` | Daily tasks, Safety checks, Risk alerts |
| `/api/weather-advisor` | `POST` | `{ "activity", "weather" }` | Decision verdict, Hazards, Precautions |
| `/api/knowledge-assistant` | `POST` | `{ "category", "query" }` | Engineering guidelines, Regulatory codes |

---

## 📄 License
This project was developed for the **Google Cloud & SmartInternz Generative AI Virtual Internship**.
Open source under the [MIT License](LICENSE).
