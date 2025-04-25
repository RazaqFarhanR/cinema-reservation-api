import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/api/hello", (req, res) => {
    res.send("Hello World");
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
