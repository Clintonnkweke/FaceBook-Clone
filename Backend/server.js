const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const { readdirSync } = require("fs");

readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
