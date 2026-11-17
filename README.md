# 🩸 RaktSetu – Online Blood Bank Management System

**Bridging the gap between blood donors, recipients, and hospitals.**

RaktSetu is a web-based Online Blood Bank Management System designed to simplify the process of finding blood donors and managing blood requests. The platform aims to connect donors, recipients, and hospitals through a centralized system, making blood availability information more accessible, especially during medical emergencies.

The project focuses on providing an organised and user-friendly platform for donor registration, blood group searching, blood requests, and blood bank management.

---

## 📌 Table of Contents

- About the Project
- Problem Statement
- Objectives
- Key Features
- Technology Stack
- Project Structure
- Installation and Setup
- Environment Configuration
- Running the Project
- Future Enhancements
- Learning Outcomes
- Author

---

## 🎯 Problem Statement

Finding compatible blood donors during medical emergencies can be challenging due to fragmented information, limited donor accessibility, and delays in communication.

Traditional blood donation coordination methods can make it difficult for recipients to quickly identify available donors and hospitals.

RaktSetu aims to address these challenges by providing a centralized digital platform that connects donors, recipients, and hospitals.

## 🎯 Objectives

- To create a centralized blood donor management platform.
- To make blood group searching easier.
- To facilitate blood donation and blood request management.
- To maintain organised donor information.
- To provide a platform for hospital management.
- To improve accessibility to blood donation information during emergencies.

---

## ✨ Key Features

### 👤 User Authentication
- User registration and login.
- Authentication-based access.
- Protected routes for authorised users.

### 🩸 Donor Management
- Donor registration.
- Donor information management.
- Blood group and location details.
- Donor availability information.

### 🔍 Find Blood
- Search for donors based on blood group.
- Access donor information.
- Find potential blood donors.

### 📩 Blood Request Management
- Submit blood requests.
- Maintain blood request information.
- Manage request-related details.

### 🏥 Hospital Management
- Hospital information management.
- Access hospital-related details.

### 🚨 Emergency Support
- Dedicated emergency section.
- Quick access to blood-related information.

### 📊 Admin Dashboard
- Intended for centralised management of the platform and its records.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| React.js | Frontend development |
| JavaScript | Application functionality |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive design |
| Node.js | Backend runtime |
| Express.js | Backend API development |
| MongoDB | Database |
| Mongoose | MongoDB object modelling |
| JWT | Authentication |
| Git & GitHub | Version control |

---

## 📁 Project Structure

```text
RaktSetu/
│
├── raktsetu/                  # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── Context/
│   │   ├── data/
│   │   ├── pages/
│   │   ├── styles/
│   │   ├── api.js
│   │   ├── App.js
│   │   └── App.css
│   ├── package.json
│   └── .gitignore
│
├── raktsetu-backend/          # Node.js Backend
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   ├── Models/
│   ├── routes/
│   ├── utils/
│   ├── seed.js
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md
```

---

## ⚙️ Installation and Setup

Follow these steps to run RaktSetu locally.

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- MongoDB Atlas account or local MongoDB installation
- Git
- Visual Studio Code

### Step 1: Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate into the project:

```bash
cd RaktSetu
```

### Step 2: Set Up the Frontend

```bash
cd raktsetu
npm install
```

### Step 3: Set Up the Backend

Open another terminal:

```bash
cd raktsetu-backend
npm install
```

### Step 4: Configure Environment Variables

Create a `.env` file inside the `raktsetu-backend` directory.

Add the following configuration:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Replace the placeholder values with your own configuration.

**Important:** Never upload your actual `.env` file, MongoDB credentials, or JWT secret to GitHub.

### Step 5: Seed Sample Data

If you want to populate the database with the project's sample data, run:

```bash
node seed.js
```

Run this only when appropriate for your database; it may insert or modify records.

---

## ▶️ Running the Project

### Start the Backend

From the backend directory:

```bash
npm run dev
```

If your package configuration does not provide this script, use:

```bash
node server.js
```

### Start the Frontend

From the frontend directory:

```bash
npm start
```

The frontend and backend should now run in separate terminals.

---

## 🔮 Future Enhancements

The following improvements are planned for future development:

- Real-time emergency blood request notifications.
- Advanced donor search and filtering.
- Improved hospital inventory management.
- Enhanced admin dashboard and analytics.
- Improved mobile responsiveness.
- Additional donor communication features.

---

## 📚 Learning Outcomes

Developing RaktSetu has provided practical experience in:

- Building frontend applications using React.js.
- Developing backend applications using Node.js and Express.js.
- Working with MongoDB databases.
- Understanding REST API integration.
- Implementing authentication and protected routes.
- Organising a full-stack project.
- Using Git and GitHub for version control.
- Understanding real-world application requirements.

---

## 📸 Project Screenshots
Here are some previews of the RaktSetu application.
Home Page
<img width="1883" height="913" alt="image" src="https://github.com/user-attachments/assets/6cd13036-8745-4ae1-9bfd-f4dc795ebcf7" />
<img width="1881" height="912" alt="image" src="https://github.com/user-attachments/assets/28b2b11d-0a8b-419c-bbfa-fea453c91a8b" />

Find Blood
<img width="1882" height="922" alt="image" src="https://github.com/user-attachments/assets/79141843-6935-4ff0-9594-f6b708b40908" />

Donor Registration
<img width="1870" height="911" alt="image" src="https://github.com/user-attachments/assets/da281410-5adb-4fcc-8cd0-cc1ef76191b6" />

Blood Request
<img width="1872" height="906" alt="image" src="https://github.com/user-attachments/assets/42e8dee6-8001-4bef-831c-4da4cd81d90a" />

Hospitals
<img width="1882" height="912" alt="image" src="https://github.com/user-attachments/assets/e4f27da2-9795-49e5-832a-bfe779e5a6e6" />

Login
<img width="1877" height="897" alt="image" src="https://github.com/user-attachments/assets/0b7de688-698f-4137-be1f-d8764d582878" />

User Profile
<img width="1887" height="912" alt="image" src="https://github.com/user-attachments/assets/d5357d11-99d8-4dce-94fa-87f51f0bcfae" />

## 👩‍💻 Author

**Khushi Sharma**

MCA Student | Aspiring Full-Stack Developer

Interested in Web Development, Software Engineering, and building real-world applications.

---

⭐ If you find this project interesting, feel free to explore the repository and share your feedback.

**RaktSetu – Every Drop Counts. Every Donor Matters. 🩸**
