import { WebSocketServer } from "ws";
import prisma from "@repo/db/client";

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", async (data) => {
    try {
      const parsedData = JSON.parse(data.toString());
      const user = await prisma.user.create({
        data: {
          name: parsedData.name,
          email: parsedData.email,
        },
      });

      ws.send(JSON.stringify(user));
    } catch (err) {
      console.error("Invalid JSON:", err);
    }
  });

  ws.send("something");
});
