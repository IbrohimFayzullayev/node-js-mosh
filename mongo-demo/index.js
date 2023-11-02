const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost/playground`)
  .then(() => console.log(`Connected to Mongodb...`))
  .catch((err) => console.log(`Couldn't connect to Mongodb...`, err));
