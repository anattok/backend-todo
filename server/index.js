import express from "express";
import mongoose from "mongoose";
import Post from "./Post.js";

const PORT = 5000;
const DB_URL =
  "mongodb+srv://user-test:pass-test@todo-claster.d8onn3s.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
  // const { author, title, content, picture } = req.body;
  //   const post = await Post.create({ author, title, content, picture });
  
  // res.status(200).json("server rabotaet");
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
