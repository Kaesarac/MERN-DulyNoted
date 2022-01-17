const express = require("express");
const res = require("express/lib/response");
const notes = require("./data/notes");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noteRoutes = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/users/login", userRoutes);

connectDB();

//app.get("/", (req, res) => {
//  res.send("API running...");
//});

//app.get("/api/notes", (req, res) => {
//res.json(notes);
//});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`listening on port ${PORT}`));
