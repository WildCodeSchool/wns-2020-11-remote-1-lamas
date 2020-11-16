const express = require("express");

const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 8000;

app.use(cors())

app.get("/", (req, res) => res.send("Hello World !"));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));