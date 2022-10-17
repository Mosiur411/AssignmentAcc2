const app = require("./app");
const connectDatabase = require("./utils/database.js");

const port = process.env.PORT || 5000;

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
