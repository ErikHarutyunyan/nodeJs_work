import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  fs.promises.readFile(path.resolve("todoData.json")).then((todos) => {
    res.send(todos);
  });
});

app.post("/todos", (req, res) => {
  fs.promises
    .writeFile(
      path.resolve("todoData.json"),
      JSON.stringify(req.body, undefined, 2)
    )
    .then(() => {
      res.send("todos posts");
    });
});

app.listen(3001);
