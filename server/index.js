import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import Post from "./Post.js";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://user-test:pass-test@todo-claster.d8onn3s.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());
app.use(cors({origin : "*"}));

app.post("/api", async (req, res) => {
  // const { author, title, content, picture } = req.body;
  //   const post = await Post.create({ author, title, content, picture });
  // res.setHeader("Access-Control-Allow-Origin", "*");
  // res.setHeader("Access-Control-Allow-Headers", "origin, content-type, accept");
  
  res.status(200).json("{msg: 'Servaer otvachaet'}");
  //  res.send("POST request to the homepage");
});

// app.get("/", (req, res) => {
//   res.send("hello")
// })
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
