const express = require("express");
const errorhandler = require("./middleware/errorhandler.js");
const connectDb = require("./config/dbconnection.js");
const dotenv=require("dotenv").config();
const app = express();
const port = process.env.PORT|| 5000;
connectDb();
app.use(express.json());
app.use('/contact' , require("./routes/contactroutes.js"));
app.use('/users', require("./routes/userroutes.js"));
app.use(errorhandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
