import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import paypal from "paypal-rest-sdk";
import orderRoutes from "./routes/orderRoutes.js";

//congif paypal
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AclsyktkK-QOw-GHnMtuC0E1o2j-GcwgkjCe28yVu2VweLCsuv6HVXeiOAhVyyw7KgFl0CAyEraeAQK3",
  client_secret:
    "EOgtfaIPJGF8PwR1Ui-9x2vtuNAUkTOMC-VlZsZ86-3W6s3iMQFNbGWc9bKucphPK3eRG_09_9GEc9X1",
});
//configure env
dotenv.config();

//databse config
connectDB();

// ES Module fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build")));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/order", orderRoutes);
//rest api
app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
const PORT = process.env.PORT || 3000;

//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
