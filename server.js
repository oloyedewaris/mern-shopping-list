const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const items = require("./routes/api/items");
const users = require("./routes/api/users");
const auth = require("./routes/api/auth");
const config = require("config");

const app = express();

//Using Middlewares
app.use(express.json());
app.use(cors());

//Config  mongodb
const db = config.get("dbURI");

//Connect to db
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  })
  .then(() => console.log("Mongodb is connected"))
  .catch((err) => console.log(err));

//use routes
app.use("/api/items", items);
app.use("/api/users", users);
app.use("/api/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Port is working at ${port}`);
});
