# 📝 To-Do Web App

🌟 **A simple and elegant To-Do web application built using the PERN stack (PostgreSQL, Express, React, Node.js).** This app features user authentication and authorization using JSON Web Tokens (JWT), allowing users to register, log in, and manage their tasks securely.

---
## 📷 **Screenshots**
![image](https://github.com/user-attachments/assets/62664d9f-d511-49da-83fb-f6ad122c6d70)
![image](https://github.com/user-attachments/assets/123f756a-d6d1-408c-9770-c036ffe4565d)
![image](https://github.com/user-attachments/assets/319b8ef0-4f9e-4fdb-9f13-8fbdf703930e)
![image](https://github.com/user-attachments/assets/3f363642-2643-4b9d-ad9d-9f9f81c38149)
![image](https://github.com/user-attachments/assets/b4a6487b-2e33-4abc-a440-9710067c22dd)

---
## 🚀 **Features**
- **User Authentication**: Register and log in with JWT-based authentication.
- **Task Management**: Add, update, and delete tasks.
- **Secure**: Protected routes and endpoints for authorized users only.
- **Modern UI**: Built with **ReactJS** and styled using **Tailwind CSS**.

---

## 🛠️ **Prerequisites**
Before running the app, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **PostgreSQL** (with a database and tables created)

---

## 🏁 **How to Set Up and Run**

### Step 1: Clone the Repository
```bash
git clone https://github.com/mouad-hachemi/todo-web-app.gitl
```
### Step 2: Install Dependencies
#### Server side:
```bash
cd todo-web-app/todo-app-server
npm install
```
#### Client side:
```bash
cd ../todo-app-client
npm install
```
### Step 3: Configure PostgreSQL
Update the database configuration in `todo-app-client/db.js` with your local **PostgreSQL** credentials:
```javascript
const pool = new Pool({
    host: "YOUR_HOST",
    user: "YOUR_POSTGRES_USERNAME",
    password: "YOUR_POSTGRES_PASSWORD",
    database: "YOUR_DATABASE_NAME",
    port: YOUR_POSTGRES_PORT, // usually 5432
});
```
### Step 4: Set Up the Database
1. Ensure PostgreSQL is installed and running.
2. Create a database and two tables using the schema provided in todo-app-server/db.sql.
### Step 5: Run the Application
#### Start the Server:
```bash
cd todo-app-server
npm start
```
#### Start client:
```bash
cd ../todo-app-client
npm run dev
```
---
## 🖥️ Technologies Used
- Backend:
    - Node.js 🟢
    - Express.js 🚀
    - PostgreSQL 🐘
    - JWT 🔐
- Frontend:
    - ReactJS ⚛️
    - Tailwind CSS 🎨

---

## 📜 **Disclaimer**
- You must have **PostgreSQL** installed and running.
- Create a database and two tables using the schema provided in `todo-app-server/db.sql`.

---

## 🌟 Contributing
Feel free to contribute to this project! Open an issue or submit a pull request.

---

## 📄 License
This project is open-source and available under the MIT License.
