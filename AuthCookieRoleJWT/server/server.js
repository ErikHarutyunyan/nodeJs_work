import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import morgan from "morgan";

const cors = require("cors");

const Role = db.role;

config();

const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
dbConnect();
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

function initial() {
  Role.estimatedDocumentCount()
    .then((count) => {
      if (count > 0) {
        return;
      }
      new Role({ name: "user" }).save().then(() => {
        console.log("added 'user' to roles collection");
      });

      new Role({ name: "moderator" }).save().then(() => {
        console.log("added 'moderator' to roles collection");
      });

      new Role({ name: "admin" }).save().then(() => {
        console.log("added 'admin' to roles collection");
      });
    })
    .catch((err) => {
      console.log("error", err);
    });
}

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome." });
});

// routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}.`));
