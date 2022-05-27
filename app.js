const express = require("express");
const db = require("./config/dbConnect.js");
const routes = require("./routes/index.js");
require("dotenv-safe").config();

db.on("error", console.log.bind(console, 'Amazon DocumentDB connection error!'))
db.once("open", () => {
    console.log('Amazon DocumentDB connected successfully!')
})

const app = express();
app.use(express.json());
routes(app);

app.listen(3000);

module.exports = app;
