import express from "express";
const app = express();
import db from "./config/sql.config.js"

const initApp = async () => {
  try {
    await db.authenticate();
    console.log("Database Connected");
    app.listen(
      process.env.PORT ? process.env.PORT : 8080,
      process.env.HOST ? process.env.HOST : "127.0.0.1",
      console.log(
        `listening on http://localhost:${
          process.env.PORT ? process.env.PORT : 8080
        }/`
      )
    );
  } catch (error) {
    console.error("Unable to connect to the database:", error.original);
  }
};
initApp();
