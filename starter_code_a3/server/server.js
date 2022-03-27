const express = require("express");
const app = express();

app.use(express.json());

//static files
app.use(express.static(__dirname +"../public"));








app.use("/", require("./routes"));
app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
