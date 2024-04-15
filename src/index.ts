import connectMongo from "./config/db";
import app from "./server";
import dotenv from "dotenv";

/**
 * Load The ENV
 */
dotenv.config();

/**
 * Port at which server will run
 */
const port = Number(process.env.PORT || 8001);

/**
 * Connecting to Database
 */
connectMongo();

/**
 * Listening The server
 */
app.listen(port, () => {
  // console.log("MONGODB____URI", process.env.MONGO_URL);
  // console.log("ENV___PORT__", process.env.PORT);
  console.log("Server is Listenening on port" + port);
});
