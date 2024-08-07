const express = require("express");
const handlebars = require("express-handlebars");
const viewsRouter = require("./src/routes/views.router.js");
const usersRouter = require("./src/routes/users.router.js");
const productsRouter = require("./src/routes/products.router.js");
const cartsRouter = require("./src/routes/carts.router.js");
const authRouter = require("./src/routes/auth.router.js");
const sessionsRouter = require("./src/routes/sessions.router.js");
const mockRouter = require("./src/routes/mock.router.js");
const loggerRouter = require("./src/routes/logger.router.js");
const forgotPasswordRouter = require("./src/routes/forgotPassword.js");
const resetPasswordRouter = require("./src/routes/resetPassword.js");
const { connectDB } = require("./src/config/index.js");
const cookieParser = require("cookie-parser");
const passport = require("./src/config/passport");
const config = require("./src/config/config");
const { specs, swaggerUi } = require("./src/config/swaggerConfig");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/src/public"));
app.use(cookieParser());

// Handlebars
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
  })
);
app.set("views", __dirname + "/src/views");
app.set("view engine", "hbs");

// Conexión a la Base de Datos
connectDB();

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use("/", viewsRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/auth", authRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api", mockRouter);
app.use("/api", loggerRouter);
app.use("/api", forgotPasswordRouter);
app.use("/api", resetPasswordRouter);

// Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.listen(PORT, (err) => {
  if (err) console.log("Error: ", err);
  console.log(`Server running on PORT ${PORT}`);
});
