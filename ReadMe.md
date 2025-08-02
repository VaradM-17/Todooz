# 📝 Tudooz – Todo Management System

**Tudooz** is a simple and user-friendly Todo Management System that helps you manage your daily tasks. It’s built with **Spring Boot** on the backend and **React** on the frontend. The backend uses **DTOs**, **ModelMapper**, and **JPA** to keep the data clean and efficient, while the UI is styled with **Bootstrap** for a modern, responsive feel.

---

## 🔧 Tech Stack

- 💻 **Frontend**: React + Bootstrap 5
- 🚀 **Backend**: Spring Boot, Spring Data JPA, ModelMapper, DTO
- 🗄 **Database**: MySQL
- 🛠 **Tools Used**: Postman, IntelliJ, Ecclipse, VS Code

---

## ✨ What You Can Do

- ➕ Add a new todo item
- ✅ Mark tasks as complete
- 📝 Edit a task if something changes
- ❌ Delete a task if it’s no longer needed
- 📃 View all your tasks in a clean, card-based layout

---

## 🖥️ How to Set It Up Locally

### ✅ Things You Need First

- Java 17 or higher
- Node.js and npm
- MySQL installed and running

---

### 📦 Backend Setup (Spring Boot)

1. Go into the backend folder:

```bash
cd tudooz/backend
```

2. Open `application.properties` and enter your MySQL credentials:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/yourdatabase
spring.datasource.username=yourusername
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
```

3. Run the backend:

```bash
./mvnw spring-boot:run
```

---

### 🌐 Frontend Setup (React)

1. Go into the frontend folder:

```bash
cd ../frontend
```

2. Install the packages:

```bash
npm install
```

3. Start the frontend server:

```bash
npm start
```

Visit the app in your browser at: `http://localhost:3000`

---

## 🗂 Project Structure

```
tudooz/
├── backend/         # Spring Boot backend
│   └── src/main/java/com/tudooz
├── frontend/        # React frontend
│   └── src/components and pages
```

---

## 🌱 Future Improvements

- 🔐 Add login/signup with JWT
- 👥 Role-based access (Admin/User)
- 📌 Pagination and filtering

---

## 🤝 Want to Contribute?

If you find bugs or have ideas to improve Tudooz, feel free to fork the repo and open a pull request. All contributions are welcome!

---
