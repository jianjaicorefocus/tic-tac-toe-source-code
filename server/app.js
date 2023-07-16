const express = require("express");
var cors = require("cors");

const connectDB = require("./config/db");
const routes = require("./routes/game");

const app = express();
app.use(cors());

connectDB();

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));

app.use("/api", routes);
