require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routers
app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Route sucessful",
  });
});

app.listen(PORT, () => console.log(`Server is up and running on: ${PORT}`));
