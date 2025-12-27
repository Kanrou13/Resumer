import ENV from "./env.ts";
import { connectDB } from "./lib/db.ts";
import app from "./app.ts";

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
