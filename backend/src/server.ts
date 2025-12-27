import ENV from "./env";
import { connectDB } from "./lib/db";
import app from "./app";

const port = ENV.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(` Server is running on port ${port} `);
    });
  })
  .catch(() => {
    console.log("MongoDb Connection failed");
  });
