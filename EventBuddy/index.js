const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const app = express();
const expressLayouts = require("express-ejs-layouts");
const port = process.env.PORT;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

app.use(cors());

// set ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));
app.set("layout", "layout/layout");
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));

const router = express.Router();

app.get("/", (req, res) => {
  res.render("admin/event/index", { title: "Home" }); // Pass data to the view
});
app.get("/admin/users", (req, res) => {
  res.render("admin/event/create", { title: "Manage Users" });
});

app.get("/admin/settings", (req, res) => {
  res.render("admin/event/edit", { title: "Settings" });
});
// mongoose connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("database connected succesfully.."))
  .catch((error) => console.log(error));

// port
app.listen(port, () => console.log(`Medicio app listening on port ${port}!`));
