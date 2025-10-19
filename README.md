# 🍽️ Restaurant Management API

A backend RESTful API built with **NestJS**, **MongoDB**, and **Mongoose**, allowing users to manage restaurants, follow/unfollow them, and get smart recommendations based on favorite cuisines.  
This project demonstrates modular architecture, clean code, input validation, and reusable components.

---

## 🚀 Features Implemented

### 🏢 Restaurant Management

- **Create Restaurant** — Add new restaurants with Arabic/English names, slug, cuisines (1–3 max), and location.
- **List Restaurants** — Retrieve all restaurants with optional filtering by cuisine.
- **Get Restaurant Details** — Fetch details by `ID` or `slug`.
- **Find Nearby Restaurants** — Use **MongoDB GeoSpatial Queries** to find restaurants within a 1KM radius.

### 👤 User Management

- **Create User** — Register users with full name and favorite cuisines.
- **Get Users** — Retrieve, find, or delete users by ID.
- **Recommendations** — Suggest restaurants based on other users’ shared favorite cuisines (Aggregation Pipeline).

### 🤝 User–Restaurant Interaction

- **Follow / Unfollow Restaurants**
- **Get Following Restaurants** — List all restaurants a user follows.
- **Get Restaurant Followers** — List all users following a restaurant.

---

## 🧱 Tech Stack

| Technology                        | Purpose                  |
| --------------------------------- | ------------------------ |
| **NestJS**                        | Backend Framework        |
| **TypeScript**                    | Type Safety & Clean Code |
| **ExpressJS**                     | Underlying HTTP Layer    |
| **MongoDB**                       | Database                 |
| **Mongoose**                      | ODM for MongoDB          |
| **Swagger**                       | API Documentation        |
| **Class Validator / Transformer** | Input Validation         |

---

## 🧩 Architecture Principles

✅ **Modular Design** — Each feature (Users, Restaurants, UserRestaurant) is built as an independent module.  
✅ **Dependency Injection** — Services are injected via Nest’s DI container.  
✅ **Clean Code** — Meaningful naming, comments, and DRY structure.  
✅ **Reusable Components** — Validation pipes and custom exceptions are shared across modules.  
✅ **Environment Config** — `.env` used for sensitive values (excluded via `.gitignore`).  
✅ **Validation Layer** — DTOs and Pipes ensure strong data validation.

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/khaled-Elgamel/Nestjs-Restaurant-Management-API.git
cd Nestjs-Restaurant-Management-API
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Create a `.env` file

Create a new file named `.env` in the project root and add the following environment variables:

```bash
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/restaurant_db
PORT=3000
```

### 4️⃣ Run the application

For development mode with auto-reload:

```bash
npm run start:dev
```

For production mode:

```bash
npm run build
npm run start:prod
```

---

## 📘 API Documentation (Swagger)

After running the server, open your browser and visit:

🔗 **[http://localhost:3000/api/docs](http://localhost:3000/api/docs)**

You’ll find:

- All available API endpoints (Users, Restaurants, User–Restaurant interactions)
- Example requests and responses
- Input and output DTO schemas

---

## 🧠 Example API Usage

### ➕ Create a Restaurant

**Endpoint:**

```
POST /api/v1/restaurants
```

**Body:**

```json
{
  "name_ar": "مطعم التحرير",
  "name_en": "Tahrir",
  "slug": "tahrir",
  "cuisines": ["Fried", "Asian"],
  "location": { "type": "Point", "coordinates": [31.205, 30.048] }
}
```

---

### 👤 Create a User

**Endpoint:**

```
POST /api/v1/users
```

**Body:**

```json
{
  "fullName": "Khaled Mohamed",
  "favoriteCuisines": ["Italian", "Seafood"]
}
```

---

### ❤️ Follow a Restaurant

**Endpoint:**

```
POST /api/v1/users/:userId/follow/:restaurantId
```

---

### 💔 Unfollow a Restaurant

**Endpoint:**

```
DELETE /api/v1/users/:userId/unfollow/:restaurantId
```

---

### 🍴 Get User Recommendations

**Endpoint:**

```
GET /api/v1/users/:userId/recommendations
```

---

### 📍 Find Nearby Restaurants

**Endpoint:**

```
GET /api/v1/restaurants/nearby?lng=31.205&lat=30.048
```

---

## 🧾 Example `.gitignore`

```
node_modules
dist
.env
```

---

## 📦 Folder Structure

```
src
├── restaurants/
│   ├── dtos/
│   ├── restaurants.controller.ts
│   ├── restaurants.service.ts
│   ├── restaurants.schema.ts
│
├── users/
│   ├── dtos/
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.schema.ts
│
├── users-restaurants/
│   ├── users-restaurants.controller.ts
│   ├── users-restaurants.service.ts
│   ├── users-restaurants.schema.ts
│
├── mongo
├── interceptors
├── filters
├── utils/
│   ├── pipes/
│   │   └── parse-mongo-id.pipe.ts
│
│
├── main.ts
└── app.module.ts
```

---

## 🧰 Used NestJS Components

| Component             | Purpose                                            |
| --------------------- | -------------------------------------------------- |
| **Modules**           | Grouped logic (Users, Restaurants, UserRestaurant) |
| **Controllers**       | Handle incoming HTTP requests                      |
| **Services**          | Contain business logic                             |
| **DTOs**              | Validate and structure input data                  |
| **Pipes**             | Transform and validate request data                |
| **Interceptors**      | Modify request/response logic                      |
| **Exception Filters** | Custom error handling                              |
| **Guards**            | Used for route protection and authorization        |

---

## 🔒 Validation & Error Handling

- All incoming data is validated using **class-validator** and **DTOs**.
- Custom **pipes** are used for MongoID validation.
- Centralized **custom exception filter** for clean and consistent error responses.

---

## 🧠 Future Improvements

- Add authentication & authorization (JWT + Guards)
- Add caching for recommendations
- Implement pagination & sorting
- Add CI/CD with GitHub Actions
- Add E2E & unit testing

---

## ✨ Author

**Khaled Mohamed Elgamel**  
📧 [kelgamel67@gmail.com]  
🌐 [https://www.linkedin.com/in/khaled-elgamel-298267235/](https://www.linkedin.com/in/khaled-elgamel-298267235/)

---

## 🎉 Enjoy!
