import express from "express";
import path from "path";
import fs from "fs";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/todos", (req, res) => {
  fs.promises.readFile(path.resolve("todoData.json")).then((todos) => {
    res.send(todos);
  });
});

app.post("/todosAdd", (req, res) => {
  fs.promises
    .readFile(path.resolve("todoData.json"))
    .then((todos) => {
      return JSON.parse(todos);
    })
    .then((data) => {
      data.push(req.body);
      return data;
    })
    .then((newData) => {
      fs.promises
        .writeFile(
          path.resolve("todoData.json"),
          JSON.stringify(newData, undefined, 2)
        )
        .then(() => {
          res.json({ mess: "todos add" });
        });
    });
});

app.put("/todosEdit", (req, res) => {
  fs.promises
    .readFile(path.resolve("todoData.json"))
    .then((todos) => {
      return JSON.parse(todos);
    })
    .then((data) => {
      return data.map((item) => {
        let { id } = item;
        return id === req.body.id ? req.body : item;
      });
    })
    .then((newData) => {
      fs.promises
        .writeFile(
          path.resolve("todoData.json"),
          JSON.stringify(newData, undefined, 2)
        )
        .then(() => {
          res.json({ mess: "todos edit" });
        });
    });
});

app.delete("/todosDelete", (req, res) => {
  fs.promises
    .readFile(path.resolve("todoData.json"))
    .then((todos) => {
      return JSON.parse(todos);
    })
    .then((data) => {
      return data.filter((item) => {
        let { id } = item;
        return id !== req.body.id;
      });
    })
    .then((newData) => {
      fs.promises
        .writeFile(
          path.resolve("todoData.json"),
          JSON.stringify(newData, undefined, 2)
        )
        .then(() => {
          res.json({ mess: "todos delete" });
        });
    });
});

app.delete("/todosDeleteCompleted", (req, res) => {
  fs.promises
    .writeFile(
      path.resolve("todoData.json"),
      JSON.stringify(req.body, undefined, 2)
    )
    .then(() => {
      res.json({ mess: "todos posts" });
    });
});

app.patch("/todosModify", (req, res) => {
  fs.promises
    .readFile(path.resolve("todoData.json"))
    .then((todos) => {
      return JSON.parse(todos);
    })
    .then((data) => {
      return data.map((item) => {
        let { id } = item;
        return id === req.body.id ? req.body : item;
      });
    })
    .then((newData) => {
      fs.promises
        .writeFile(
          path.resolve("todoData.json"),
          JSON.stringify(newData, undefined, 2)
        )
        .then(() => {
          res.json({ mess: "todos delete completed" });
        });
    });
});

app.listen(3001);
