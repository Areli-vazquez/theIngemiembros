express = require("express");
const app = express();
const path = require("path");
morgan = require("morgan");
//Settings
app.set("port", 5000);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false })); //para usar los datos de los formularios
//Routes
app.use(require("./routes/index"));

//Static
app.use(express.static(path.join(__dirname, "public")));

// 404 handler
app.use((requ, res, next) => {
  res.status(404).send("404 Not found");
});
module.exports = app;
