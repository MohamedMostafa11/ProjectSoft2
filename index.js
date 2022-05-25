const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
port = 4040;
const adminRoutes = require("./routes/admin");
const userRoute = require("./routes/users");
const login = require("./routes/login");








const app = express();
app.use(express.json());
app.use(bodyparser.json())
//use routes
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoute);
app.use("/api/login", login);





//import contents of .env file
require("dotenv").config();
const mongoString = process.env.DATABASE_URL;

//connect to database
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
