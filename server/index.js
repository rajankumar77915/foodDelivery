import express from "express";
const app = express();

import restaurantRoutes from "./routes/resturant.js";
import userRoutes from "./routes/user.js";
import   itemRoutes from "./routes/iteam.js"

import { dbConnection } from "./config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors"; //use to entertaint frontend
// import { cloudinaryConnect } from "./config/cloudinary";
import dotenv from "dotenv";
// import fileupload from "express-fileupload";

dotenv.config();

//middleware to pass jsong request body
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// app.use(fileupload({
//     useTempFiles: true,
//     tempFileDir: "d:/mongo+express/express6/CourseBuy_project_MERN/server/tempFile/",
// }));
// cloudinaryConnect();
dbConnection();

// version:1
app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/restaurant", restaurantRoutes);
app.use("/api/v1/iteam",itemRoutes)

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`at ${PORT}`);
});

<<<<<<< HEAD

app.use("/api/user", userRoutes);

// connecting to the database(mongodb)
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listening request
    app.listen(port, () => {
      console.log(`Connected to Mongo & Listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error);
=======
app.get("/", (req, res) => {
  return res.json({
    sucess: true,
    message: "your server is running up and running...",
>>>>>>> 4a74a51c0aa02a007caa7cbb7cdafbda65ed294f
  });
});