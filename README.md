# 🌍 Natours — Tour Booking Application

## 📌 About the Project

Natours is a tour booking web application developed while learning backend development. It allows users to explore tours, view tour details, discover tour locations on interactive maps, and book tour experiences.

This project focuses on learning backend development using Node.js, Express.js, and MongoDB, along with server-side rendering using Pug.

## 🛠️ Technologies Used

- **Node.js** — JavaScript runtime
- **Express.js** — Backend web framework
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB object modeling
- **Pug** — Server-side templating engine for rendering frontend pages
- **Mapbox API** — Interactive maps for displaying tour locations
- **JWT** — Authentication and authorization
- **HTML, CSS, JavaScript** — Frontend technologies

## ✨ Features

- User registration and login
- Tour listing and tour details
- Tour booking functionality
- Interactive maps using Mapbox API
- Server-side rendering using Pug templates
- MongoDB database integration
- Authentication and authorization
- Password reset functionality
- API filtering, sorting, and pagination
- Error handling and middleware

*Note: The features listed above should match the functionality implemented in your current version.*

## 📂 Project Structure

```text
4-natours/
└── starter/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── views/
    ├── public/
    ├── utils/
    ├── app.js
    ├── server.js
    ├── package.json
    └── README.md
```

## ⚙️ Installation and Setup

### 1. Navigate to the project directory

```bash
cd 4-natours/starter
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `config.env` file and add the environment variables required by your application.

```env
NODE_ENV=development
PORT=3000
DATABASE=your_mongodb_connection_string
MAPBOX_TOKEN=your_mapbox_access_token
```

Add other required variables, such as JWT secrets and email credentials, according to your application configuration.

### 4. Start the server

```bash
npm run start
```

Use the appropriate command defined in your `package.json`.

## 📚 What I Learned

- Building RESTful APIs using Express.js
- Connecting and interacting with MongoDB using Mongoose
- Rendering dynamic web pages using Pug
- Integrating Mapbox API for interactive maps
- Implementing authentication and authorization
- Working with middleware and error handling
- Understanding the MVC architecture
- Managing environment variables and backend configuration

## 🙏 Acknowledgment

This project was developed as part of my backend development learning journey while following **Jonas Schmedtmann's Node.js, Express, MongoDB & More: The Complete Bootcamp**.

I built this project alongside the instructor to gain practical experience and strengthen my understanding of backend development.

Course repository: https://github.com/jonasschmedtmann/complete-node-bootcamp

---

**Note:** This project was built during my learning journey with Jonas Schmedtmann as part of my backend development practice.
