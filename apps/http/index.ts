import express from "express";
import { prisma } from "db";

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).json({ message: "Error fetching users", error });
  }
});

app.post("/", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: "Missing username or password" });
  }
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password,
      },
    });
    return res.status(200).json(user.id);
  } catch (error) {
    return res.status(500).json({ message: "Error creating user" });
  }
});

app.listen(3001, () => {
  console.log("HTTP server listening on port 3001");
});
