require("dotenv").config();

const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose");

// express app
const app = express();

// middlewares
app.use(
  cors({
    credentials: true,
  })
);

app.use(express.json());

// routes

app.get("/", (req, res) => {
  res.status(200).json({ message: "welcome to tormack sercer!" });
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server runnig on port: ${port}`);
});
