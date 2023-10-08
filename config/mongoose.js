import mongoose from "mongoose";
import dotenv from "dotenv";
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongodb error");
});
db.once("open", () => {
  console.log("mongodb connected!");
});

export default db