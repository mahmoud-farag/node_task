const mongoose = require("mongoose");

exports.connectDB = (url) => {
  connection = mongoose.connect(url);
  mongoose.connection.on("connected", () => {
    console.log("connected");
  });
  mongoose.connection.on("error", (error) => {
    console.log("Some error ", error);
  });
};
