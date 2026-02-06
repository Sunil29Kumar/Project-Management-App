import express from "express";
import { connectDB } from "./database/db.js";
import cors from "cors";

import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import projectRouter from "./routes/project.route.js";
import cookieParser from 'cookie-parser';


connectDB();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cookieParser(process.env.SECRET_KEY));

app.set("trust proxy", 1);


app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());


app.get("/", (req, res) => {
  res.send("API is running...");
});

// auth routes
app.use("/auth", authRouter);
app.use("/user", userRouter)
app.use("/projects", projectRouter)



app.use((err, req, res, next) => {
  // console.error("unexpected error", err);
  return res.status(500).json({ error: "somethig went wrong" });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



