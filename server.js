const express = require("express");
const bodyParser = require("body-parser");
const { router } = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/cutting-plan", router);

app.listen(PORT, () => console.log("server listening on port ", PORT));
