const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ExecutiveRouter = require('./routes/ExecutiveRouter');
const LocationRoute = require('./routes/LocationRoute');
const adminRouter = require('./routes/adminRouter');

const app = express();

// Middleware

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
  origin: ["http://localhost:3000", "https://nihon-location.vercel.app"],
  credentials: true
}));

// Routes
app.use("/api", ExecutiveRouter);
app.use("/api", LocationRoute);
app.use("/api", adminRouter)

// Home route
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));