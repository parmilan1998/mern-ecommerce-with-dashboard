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
import productRoute from "./routes/product.routes.js";
// import orderRoute from "./routes/order.routes.js";
import userRoute from "./routes/user.routes.js";
// import reviewRoute from "./routes/review.routes.js";
// import cartRoute from "./routes/cart.routes.js";
// import paymentRoute from "./routes/payment.routes.js";

// use routes
app.use("/api/v1/category", categoryRoute);
app.use("/api/v1/product", productRoute);
// app.use("/api/v1/order", orderRoute);
// app.use("/api/v1/payment", paymentRoute);
// app.use("/api/v1/cart", cartRoute);
app.use("/api/v1/user", userRoute);
// app.use("/api/v1/review", reviewRoute);

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
