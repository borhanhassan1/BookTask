const app = require("./app");
require("dotenv").config();
const port = process.env.PORT || 3000;

const connectDB = require("./config/db");
connectDB();


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
