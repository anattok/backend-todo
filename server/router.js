import Router from "express";
import Todo from "./Post.js";

const router = new Router();

//добавить новую
router.post("/todos", async (req, res) => {
  try {
    const { text, checked } = req.body;
    const post = await Todo.create({ text, checked });

    res.status(200).json(post);
  } catch (error) {
    console.log(error._message);
    res.status(400).json({ err: error._message });
  }
});

//получить все
router.get("/todos", async (req, res) => {
  try {
    Todo.find({}).then((list) => {
      res.json(list);
    });
  } catch (error) {
    console.log(error._message);
    res.status(400).json({ err: error._message });
  }
});

// удалить все
router.delete("/todos", async (req, res) => {
  try {
    Todo.deleteMany({}).then((list) => {
      res.json(list);
    });
  } catch (error) {
    console.log(error._message);
    res.status(400).json({ err: error._message });
  }
});

// изменить один
router.patch("/todos", async (req, res) => {
  try {
    const filter = { _id: `ObjectId(${req.body})` };
    const id = { checked: { $not: "$checked" } };
    Todo.findOneAndUpdate(filter, id).then((list) => {
      res.json(list);
    });
  } catch (error) {
    console.log(error._message, "Это метод патч");
    res.status(400).json({ err: error._message });
  }
});

router.delete("/todos/:id");

export default router;
