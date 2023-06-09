var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var productRouter = require("./routes/product");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "myApp",
    resave: false,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  if (req.cookies.nombre != undefined) {
    req.session.nombre = req.cookies.nombre;
    req.session.email = req.cookies.email;
    req.session.foto = req.cookies.fotodeperfil;
    req.session.idUser = req.cookies.id;
  }
  return next();
});

app.use((req, res, next) => {
  if (req.cookies.nombre != undefined) {
    res.locals.userLogueado = {
      nombre: req.cookies.nombre,
      foto: req.cookies.foto,
      email: req.cookies.email,
      id: req.cookies.id,
    };
    return next();
  }
  if (req.session.nombre != undefined) {
    res.locals.userLogueado = {
      nombre: req.session.nombre,
      foto: req.session.foto,
      email: req.session.email,
      id: req.session.idUser,
    };
  } else {
    res.locals.userLogueado = null;
  }
  return next();
});

app.post("/logout", (req, res) => {
  res.clearCookie("nombre");
  res.clearCookie("foto");
  res.clearCookie("email");
  res.clearCookie("idUser");
  req.session.destroy(() => {
    res.redirect("/");
  });
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/products", productRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
