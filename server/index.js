// server.js
const express = require('express');
const http = require('http');
const socketIO = require("socket.io");
const mongoose = require('mongoose');
const cors = require('cors');
const authMiddleware = require('./middleware/authMiddleware.js');
const messageRoutes = require("./routes/messages");
const userRoutes = require("./routes/userRoutes");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "http://localhost:5173", // frontend origin
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.use('/api/posts', require('./routes/posts'));
app.use('/api/auth',require('./routes/auth'));
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);


// Store active users
let onlineUsers = {};

io.on("connection", (socket) => {
  console.log("🔌 A user connected: " + socket.id);

  socket.on("addUser", (userId) => {
    onlineUsers[userId] = socket.id;
    io.emit("updateOnlineUsers", Object.keys(onlineUsers)); // 🔄 Broadcast all online user IDs
  });

  socket.on("typing", ({ senderId, receiverId }) => {
  const receiverSocket = onlineUsers[receiverId];
  if (receiverSocket) {
    io.to(receiverSocket).emit("typing", { senderId });
  }
});

socket.on("stopTyping", ({ senderId, receiverId }) => {
  const receiverSocket = onlineUsers[receiverId];
  if (receiverSocket) {
    io.to(receiverSocket).emit("stopTyping", { senderId });
  }
});


  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    const receiverSocket = onlineUsers[receiverId];
    if (receiverSocket) {
      io.to(receiverSocket).emit("getMessage", {
        senderId,
        content,
      });
    }
  });

  socket.on("disconnect", () => {
    console.log("❌ A user disconnected: " + socket.id);
    for (let id in onlineUsers) {
      if (onlineUsers[id] === socket.id) {
        delete onlineUsers[id];
        break;
      }
    }
     io.emit("updateOnlineUsers", Object.keys(onlineUsers));
  });
});




mongoose.connect('mongodb://localhost:27017/instagram-clone');
server.listen(5000, () => console.log("Server running on port 5000"));
