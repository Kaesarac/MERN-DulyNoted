const express = require("express");
const res = require("express/lib/response");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const noteRoutes = require("./routes/noteRoutes");
const userRoutes = require("./routes/userRoutes");
const Protect = require("./middlewares/authMiddleware");

const app = express();
require("dotenv").config(); //para usar environment variables do .env

app.use(express.json());
app.use("/api/users", userRoutes); //rotas de usuário
app.use("/api/users/login", Protect, userRoutes);
app.use("/api/notes", Protect, noteRoutes); //rotas de Notes
app.use("/api/notes/create", Protect, noteRoutes);

connectDB();

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`listening on port ${PORT}`));
