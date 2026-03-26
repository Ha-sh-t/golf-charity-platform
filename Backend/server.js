import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import drawRoutes from "./routes/drawRoutes.js";
import charityRoutes from "./routes/charityRoutes.js";


dotenv.config();

const app = express();

// connect DB

// middleware
app.use(cors({
  origin: "*"
}));
app.use(express.json());


app.use("/api/auth", authRoutes);

app.use("/api/user", userRoutes);

app.use("/api/scores", scoreRoutes);

app.use("/api/draw", drawRoutes);

app.use("/api/charity", charityRoutes);

// test route
app.use("/" , (req,res)=>{res.send("API is running..")});
app.use((req , res)=>{res.send("Route not found ...")})
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
 await connectDB();

});
