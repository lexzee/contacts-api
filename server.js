const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/db");
const app = express();
const dotenv = require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 8000;

app.use(express.json())
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler)

app.listen(PORT, ()=>{
  console.log(`Server Listening on PORT: ${PORT}`);
});