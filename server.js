const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const ExecutiveRouter = require('./routes/ExecutiveRouter');
const LocationRoute = require('./routes/LocationRoute');

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

// Home route
app.get("/", (req, res) => {
  res.send("Home page");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.error(err));
