import express from "express";
import prisma from "@repo/db/client";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend server");
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();

  return res.json({
    msg: "Get data",
    users,
  });
});

app.post("/user", async (req, res) => {
  const { email, name } = req.body;
  const user = await prisma.user.create({
    data: {
      email,
      name,
    },
  });

  return res.json({
    msg: "Post data",
    user,
  });
});

app.listen(4000);
