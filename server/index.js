import express from "express";
const app = express();

import restaurantRoutes from "./routes/resturant.js";
import userRoutes from "./routes/user.js";
import   itemRoutes from "./routes/iteam.js"
import ProfileRoutes from "./routes/profile.js";
import OrderRoutes from "./routes/order.js";
import paymentRoutes from './routes/Payments.js'
import { dbConnection } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"; //use to entertaint frontend
import { cloudinaryConnect } from "./config/cloudinary.js";
import dotenv from "dotenv";
import fileupload from "express-fileupload";
cloudinaryConnect()
dotenv.config();

//middleware to pass jsong request body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://food-delivery1.vercel.app",
    credentials: true,
  })
);

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "d:/foodDelivery/server/tempFile/",
}));
// cloudinaryConnect();
dbConnection();

// version:1
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/iteam",itemRoutes)
app.use("/api/v1/profile",ProfileRoutes)
app.use("/api/v1/payment",paymentRoutes);
app.use("/api/v1/order",OrderRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`at ${PORT}`);
});

app.get("/", (req, res) => {
  return res.json({
    sucess: true,
    message: "your server is running up and running...",
  });
});