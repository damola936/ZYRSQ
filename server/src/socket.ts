import { Server } from "socket.io";

export const initSocket = (io: Server) => {
    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Join a private room for direct messaging
        socket.on("join", (userId: string) => {
            socket.join(userId);
            console.log(`User ${userId} joined their room`);
        });

        // Handle sending a message
        socket.on("sendMessage", ({ receiverId, message }) => {
            io.to(receiverId).emit("receiveMessage", message);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};