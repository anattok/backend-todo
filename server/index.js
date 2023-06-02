import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import router from "./router.js";


const PORT = 5000;
const DB_URL =
  "mongodb+srv://user-new:pass-new@cluster0.fyk2zqg.mongodb.net/?retryWrites=true&w=majority";

  

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://127.0.0.1:8080" }));

app.use("/api", router)





async function startApp() {
  try {
    await mongoose.connect(DB_URL);
    app.listen(PORT, () => {
      console.log("server rabotaet na porty nomer " + PORT);
    });
  } catch (error) {
    console.log(error);
  }
}
startApp();
