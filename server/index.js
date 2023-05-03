import express from "express";
const app = express();
app.listen(
    process.env.PORT ? process.env.PORT : 8080,
    process.env.HOST ? process.env.HOST : "127.0.0.1",
    console.log(
        `listening on http://localhost:${
            process.env.PORT ? process.env.PORT : 8080
        }/`
    )
);
