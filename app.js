const http = require("http");
const express = require("express");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const dbconn = require("./database/db");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(express.static("public"));

app.use("/api/", require("./Routes/task.route"));

server.listen(PORT, () => console.log("listening on port", PORT));
