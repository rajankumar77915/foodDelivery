require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const restaurantRoutes = require("./routes/resaturantRoute");
const userRoutes = require("./routes/userRoute");

// express app
const app = express();

// port
const port = process.env.PORT || 4000;

// middlewares
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


<<<<<<< HEAD
=======
app.use("/api/user", userRoutes);
>>>>>>> 85849e579b46441f8d25d8420348f8710bc83a29

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
  });
