import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import tournamentRouter from "./routes/tournamentRoutes.js";
import participantsRouter from "./routes/participantsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// DB Connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successfull😃👍"));

// Body parser
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome all!!!");
});

app.use("/tournaments", tournamentRouter);
app.use("/participants", participantsRouter);

app.listen(PORT, () => {
  console.log(`The server is connected to port: ${PORT} 🚀`);
});
