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

**Turn-HERE!** is a LaunchCode Capstone 2 full-stack web application built using **React** on the frontend, **Spring Boot** on the backend, and **MySQL** as the relational database.

The application helps users quickly plan **day trips** by exploring cities and selecting attractions to create personalized travel itineraries.

Users can browse cities, search locations, generate random destinations, and save trip plans. Admin users can manage all cities and attractions through a protected dashboard.

# 🖼️ Application Preview

<img width="843" height="987" alt="image" src="https://github.com/user-attachments/assets/368ada26-303e-47b3-8a7d-1f9d2b2884b9" />

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
- Create, Edit, and delete attractions


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
```

---

## Step 2 — Configure the Database

1. Open **MySQL Workbench**
2. Create a new schema:

```sql
CREATE DATABASE turnhere;
```

3. Update your backend `application.properties`:

```
spring.datasource.url=jdbc:mysql://localhost:3306/turnhere
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

---

## Step 3 — Install Backend Dependencies

```bash
cd backend
mvn clean install
```

---

## Step 4 — Install Frontend Dependencies

```bash
cd frontend
npm install
```

---

# ▶️ Running the Application

## Start the Backend (Spring Boot)

From the project root or backend folder:

```bash
mvn spring-boot:run
```

Backend runs at:

👉 http://localhost:8080

---

## Start the Frontend (React)

From the frontend folder:

```bash
npm run dev
```

Frontend runs at:

👉 http://localhost:5173

---
## 🏗️ Project Structure
```
Fullstack2TurnHERE/
├── Backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/turnhere/fullstack2/
│   │       │       ├── config/
│   │       │       │   └── SecurityConfig.java
│   │       │       ├── controllers/
│   │       │       │   ├── AuthController.java
│   │       │       │   ├── AdminCityController.java
│   │       │       │   ├── AdminAttractionController.java
│   │       │       │   ├── AdminItineraryController.java
│   │       │       │   ├── SavedItineraryController.java
│   │       │       │   └── ReviewController.java
│   │       │       ├── dto/
│   │       │       │   ├── AdminRegistrationRequest.java
│   │       │       │   ├── AttractionRequest.java
│   │       │       │   ├── ItineraryRequest.java
│   │       │       │   ├── ReviewRequest.java
│   │       │       │   ├── SavedItineraryRequest.java
│   │       │       │   ├── UserLoginRequest.java
│   │       │       │   └── UserRegistrationRequest.java
│   │       │       ├── models/
│   │       │       │   ├── Attraction.java
│   │       │       │   ├── City.java
│   │       │       │   ├── Itinerary.java
│   │       │       │   ├── Review.java
│   │       │       │   ├── SavedItinerary.java
│   │       │       │   ├── User.java
│   │       │       │   └── UserRole.java
│   │       │       └── repository/
│   │       │           ├── AttractionRepository.java
│   │       │           ├── CityRepository.java
│   │       │           ├── ItineraryRepository.java
│   │       │           ├── ReviewRepository.java
│   │       │           ├── SavedItineraryRepository.java
│   │       │           └── UserRepository.java
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── Frontend/
    ├── src/
    │   ├── assets/
    │   │   └── car.png
    │   ├── components/
    │   │   ├── About.jsx
    │   │   ├── AdminDashboard.jsx
    │   │   ├── AdminLogin.jsx
    │   │   ├── AdminRegistration.jsx
    │   │   ├── CityItinerary.jsx
    │   │   ├── CityList.jsx
    │   │   ├── CityRandomizer.jsx
    │   │   ├── CollapsibleMenu.jsx
    │   │   ├── CreateItinerary.jsx
    │   │   ├── EditItinerary.jsx
    │   │   ├── Footer.jsx
    │   │   ├── Header.jsx
    │   │   ├── LoginForm.jsx
    │   │   ├── RegistrationForm.jsx
    │   │   ├── ReusableButton.jsx
    │   │   ├── Search.jsx
    │   │   ├── TripSaver.jsx
    │   │   └── UserDashboard.jsx
    │   ├── services/
    │   │   └── api.js
    │   ├── App.jsx
    │   ├── App.css
    │   ├── index.css
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

---

## 🔌 API Endpoints

### Auth Controller - `/api/auth`

| Method | Endpoint | Request Body | Description |
|--------|----------|-------------|-------------|
| `POST` | `/api/auth/register` | `UserRegistrationRequest` | Register new user account |
| `POST` | `/api/auth/register-admin` | `AdminRegistrationRequest` | Register new admin - requires secret key |
| `POST` | `/api/auth/login` | `UserLoginRequest` | Login user or admin |
| `GET` | `/api/auth/user/{id}` | None | Get user by ID |

### City Controller - `/api/admin/cities`

| Method | Endpoint | Request Body | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/admin/cities` | None | Get all cities |
| `POST` | `/api/admin/cities` | `City` | Create new city |
| `PUT` | `/api/admin/cities/{id}` | `City` | Update city by ID |
| `DELETE` | `/api/admin/cities/{id}` | None | Delete city by ID |

### Attraction Controller - `/api/admin/attractions`

| Method | Endpoint | Request Body | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/admin/attractions` | None | Get all attractions |
| `POST` | `/api/admin/attractions` | `AttractionRequest` | Create new attraction |
| `PUT` | `/api/admin/attractions/{id}` | `AttractionRequest` | Update attraction by ID |
| `DELETE` | `/api/admin/attractions/{id}` | None | Delete attraction by ID |

### Admin Itinerary Controller - `/api/admin/itineraries`

| Method | Endpoint | Request Body | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/admin/itineraries` | None | Get all itineraries |
| `GET` | `/api/admin/itineraries/{id}` | None | Get itinerary by ID |
| `GET` | `/api/admin/itineraries/city/{cityId}` | None | Get itineraries by city |
| `POST` | `/api/admin/itineraries` | `ItineraryRequest` | Create new itinerary |
| `PUT` | `/api/admin/itineraries/{id}` | `ItineraryRequest` | Update itinerary by ID |
| `DELETE` | `/api/admin/itineraries/{id}` | None | Delete itinerary by ID |

### Saved Itinerary Controller - `/api/itineraries`

| Method | Endpoint | Request Body | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/itineraries` | None | Get all saved itineraries |
| `GET` | `/api/itineraries/{id}` | None | Get saved itinerary by ID |
| `GET` | `/api/itineraries/user/{userId}` | None | Get itineraries by user ID |
| `POST` | `/api/itineraries` | `SavedItineraryRequest` | Create new saved itinerary |
| `PUT` | `/api/itineraries/{id}` | `SavedItineraryRequest` | Update saved itinerary by ID |
| `DELETE` | `/api/itineraries/{id}` | None | Delete saved itinerary by ID |

### Review Controller - `/api/reviews`

| Method | Endpoint | Request Body | Description |
|--------|----------|-------------|-------------|
| `GET` | `/api/reviews` | None | Get all reviews |
| `GET` | `/api/reviews/{id}` | None | Get review by ID |
| `GET` | `/api/reviews/itinerary/{itineraryId}` | None | Get reviews by itinerary |
| `GET` | `/api/reviews/user/{userId}` | None | Get reviews by user |
| `POST` | `/api/reviews` | `ReviewRequest` | Create new review |
| `PUT` | `/api/reviews/{id}` | `ReviewRequest` | Update review by ID |
| `DELETE` | `/api/reviews/{id}` | None | Delete review by ID |
---
# 🗄️ Database Schema

You can view the full ERD (Entity Relationship Diagram) here:

👉 **ERD:**  
https://www.figma.com/design/d7kciJWQKx44HTrqIj15po/ERD---TURN-HERE?node-id=0-1&p=f&t=4TAuCsCv2kjjE47l-0

---

# 🛠️ Troubleshooting

### ❗ MySQL Connection Errors
- Ensure MySQL is running  
- Verify username/password in `application.properties`  
- Check that the schema **turnhere** exists  

### ❗ Port Already in Use
- Backend default port: **8080**  
- Frontend default port: **5173**  
Kill the process or change the port.

### ❗ CORS Errors
If frontend cannot reach backend:
- Ensure backend is running  
- Ensure CORS is enabled in your Spring Boot config  

### ❗ Login Not Working
- Make sure passwords are hashed using BCrypt  
- Ensure the user exists in the database  

### ❗ React App Not Loading
```bash
rm -rf node_modules
npm install
```

---

# 👤 Author

**Bruno Araujo**  
Junior Full‑Stack Developer  

  
LinkedIn:  www.linkedin.com/in/bruno-araujo-ab1091137
Portfolio:  https://brunsaraujo.github.io/











