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

        // Join a project room for real time updates
        socket.on("joinStudioProject", (userId: string, projectId: string) => {
            socket.join(projectId);
            console.log(`User ${userId} joined project room ${projectId}`);
        });

        // broadcast when a collaborator makes changes (new track uploaded, comment added, etc.)
        socket.on("projectUpdate", ({ projectId, update }) => {
            io.to(projectId).emit("projectUpdated", update);
        });

        //  leave a project room
        socket.on("leaveStudioProject", (userId: string, projectId: string) => {
            socket.leave(projectId);
            console.log(`User ${userId} left project room ${projectId}`);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};