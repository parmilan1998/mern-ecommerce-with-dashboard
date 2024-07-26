import express from "express";
import connectDB from "./db/database.js";
import cors from "cors";

const app = express();

const PORT = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());

// import routes
import categoryRoute from "./routes/category.routes.js";

// use routes
app.use("/api/v1/category", categoryRoute);

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
