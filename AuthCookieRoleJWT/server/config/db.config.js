import mongoose from "mongoose";

const dbConnect = () => {
  const connectionParams = { useUnifiedTopology: true, useNewUrlParser: true };
  mongoose.connect(process.env.MONGO_URL, connectionParams);

  mongoose.connection.on("connected", () => {
    console.log("Connected to database Mongodb");
  });

  mongoose.connection.on("error", (err) => {
    console.log("Error while connecting to database Mongodb :" + err);
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongodb connection disconnected");
  });
};

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

export default dbConnect;
