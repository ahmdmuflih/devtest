const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");
const EventRoute = require("./routes/EventRoute");
const UserRoute = require("./routes/UserRoute");
const AuthRoute = require("./routes/AuthRoute");
const AdminRoute = require("./routes/AdminRoute");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const userAuthMiddleware = require("./middleware/userAuthMiddleware");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
const port = 3253;
const expressLayouts = require("express-ejs-layouts");
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 604800000,
    },
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(express.static("public"));
app.use(EventRoute);
app.use(UserRoute);
app.use(AuthRoute);
app.use(AdminRoute);

app.use("/login", (req, res, next) => {
  if (req.session && req.session.user) {
    res.redirect("/");
  } else {
    next();
  }
});

app.get("/admin", async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.render("adminTventDash/adminSWDash", {
      title: "Admin",
      layout: "layouts/main-layout",
      phone_number: "+62 858 1564 8255",
      events: events,
    });
  } catch (error) {
    console.error("Error fetching events:", error.message);
    throw error;
  }
});

app.post("/verif/:eventId", async (req, res) => {
  const eventId = parseInt(req.params.eventId);
  const newStatus = req.body.status;

  try {
    const updatedEvent = await prisma.event.update({
      where: { id: eventId },
      data: {
        status: newStatus,
      },
    });

    res.status(401).redirect("/admin");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(
    `Example app listening on port ${port}, Link= http://localhost:${port}/`
  );
});
