# Turn-HERE! 🚗
### Your Day Trip Planned For You

> A full-stack web application that helps users discover day trip destinations, browse local attractions, and create personalized travel itineraries.

---

# 📋 Table of Contents

- [About the Project](#about-the-project)
- [Wireframes](#wireframes)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [User Roles](#user-roles)
- [Troubleshooting](#troubleshooting)
- [Author](#author)

---

# 📖 About the Project

**Turn-HERE!** is a LaunchCode Capstone 2 full-stack web application built using **React** on the frontend and **Spring Boot** on the backend.

The application helps users quickly plan **day trips** by exploring cities and selecting attractions to create personalized travel itineraries.

Users can browse cities, search locations, generate random destinations, and save trip plans. Admin users can manage all cities, attractions, and itineraries through a protected dashboard.

---

# 🗂️ Wireframes

You can view the full application wireframes here:

👉 **Wireframes (Google Doc):**  
https://docs.google.com/document/d/1pyAW_etMl4eJTH41GKWMFecRPQgy36Tt/edit?usp=sharing&ouid=100617101241565328502&rtpof=true&sd=true

---

# 🛠️ Technologies Used

## Frontend

| Technology | Purpose |
|------------|---------|
| React 18+ | Component-based UI framework |
| Vite | Fast build tool and development server |
| React Router DOM v6 | Client-side routing |
| Axios | API communication |
| CSS3 | Custom styling |
| JavaScript ES6+ | Frontend programming |

---

## Backend

| Technology | Purpose |
|------------|---------|
| Java 21 | Backend programming language |
| Spring Boot 3.2.3 | Backend framework |
| Spring Data JPA | ORM and database interaction |
| Spring Security | Authentication and password hashing |
| Hibernate 6.4.4 | ORM implementation |
| Maven | Dependency and build management |

---

## Database

| Technology | Purpose |
|------------|---------|
| MySQL 8+ | Relational database |
| MySQL Connector/J | Java MySQL driver |
| HikariCP | Database connection pooling |

---

# ✨ Features

## User Features

- Register and login securely
- Browse cities and attractions
- Search cities by name or state
- Random city generator for spontaneous trips
- Create custom travel itineraries
- Edit and delete saved itineraries
- Leave reviews on itineraries
- Smooth scrolling UI and responsive design

---

## Admin Features

- Secure admin registration with secret key
- Protected Admin Dashboard
- Create, edit, and delete cities
- Manage attractions
- Full content management system

---

## Technical Features

- Role-based access control (`USER`, `ADMIN`)
- RESTful API architecture
- Full CRUD functionality
- Responsive layout with multiple breakpoints
- Custom CSS animations
- Collapsible navigation
- Inline form validation
- Parallel data fetching using `Promise.all`

---

# ✅ Prerequisites

Before running the application, install the following tools:

| Tool | Version |
|------|--------|
| Java JDK | 21 |
| Node.js | 18+ |
| MySQL | 8+ |
| MySQL Workbench | Latest |
| Git | Latest |
| IntelliJ IDEA | Latest |
| VS Code | Latest |

---

# 🚀 Installation & Setup

## Step 1 — Clone the Repository

```bash
git clone https://github.com/BrunsAraujo/Fullstack2TurnHERE.git
cd Fullstack2TurnHERE
