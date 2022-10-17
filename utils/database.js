const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDatabase = () => {
  mongoose
    .connect(
      "mongodb+srv://tourUser1:0sAKy8d4oWpY7Zqx@cluster0.ettjiev.mongodb.net/tour-management-server?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((data) => {
      console.log(`Mongodb connected with server: ${data.connection.host}`);
    });
};

module.exports = connectDatabase;
