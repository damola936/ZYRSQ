import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { initSocket } from "./socket.js";

dotenv.config();

const app = express(); // Initialize Express app
const httpServer = createServer(app); // Create HTTP server (socket io expects HTTP Server)

const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:3000" }));
app.use(express.json());

// Health check route
app.get("/", (req, res) => {
    res.send("ZYRSQ server is running");
});

// Init socket
initSocket(io);

const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});