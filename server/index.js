const mongoose = require("mongoose");
const app = require("./app")
const config = require("config");
if (!config.get("privateKey")) {
  console.error("FATAL ERROR: privateKey is not defined");
  process.exit(1);
}

const port = 3030;

mongoose.connect("mongodb://127.0.0.1:27017/todo_list")
.then(() => {
    console.log("connected to the database now")
    app.listen(port, () => console.log("listening on port"));
})