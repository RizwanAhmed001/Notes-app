import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/connectDB.js";
import userRoute from "./routes/user.route.js";
dotenv.config()

const app = express();
connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));


app.use("/api", userRoute)

app.get("/", (req, res) => {
  res.send("API WORKING!")
})

const port = process.env.PORT || 4000

app.listen(port, () => {
  console.log(`Server Running At Port http://localhost:${port}`)
})