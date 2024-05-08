const mongoose = require("mongoose");
const app = require("./app")
// const config = require("config");
const username = "binduachuthahorti1999";
const password = "VXnWUPiJU3CGNSlG";
// if (!config.get("privateKey")) {
//   console.error("FATAL ERROR: privateKey is not defined");
//   process.exit(1);
// }

const port = 3030;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.usjg4sa.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
.then(() => {
    console.log("connected to the database now")
    app.listen(port, () => console.log("listening on port"));
})