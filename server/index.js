import dotenv from "dotenv";
dotenv.config();

import connectToDatabase from "./databse.js";
import express from "express";
import cors from "cors";
import path from "path";
//our routes
import bookRoutes from "./routes/bookRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import libraryRoutes from "./routes/libraryRoutes.js";

connectToDatabase();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/library", libraryRoutes);
app.get("/api/config/paypal", (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server run on port ${port}`);
});
