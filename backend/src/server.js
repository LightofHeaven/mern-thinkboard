// https://www.youtube.com/watch?v=F9gB5b4jgOI&list=PPSV&t=1s 3:27:13
// pass: IDK4yEAwvRytmpSM
// mongodb+srv://arikgeraldy1:IDK4yEAwvRytmpSM@cluster0.1miccsq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
app.use(express.json());
app.use(rateLimiter);

// app.use((req, res, next) => {
//     console.log(`Req method nya ${req.method} & Req URL nya ${req.url}`);
//     next();
// })

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
