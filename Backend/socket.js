const socketIO = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
    io = socketIO(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on('join', async (data) => {
            const { userId, userType } = data;
            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
                socket.join('captains');
            }
        });

        socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

function sendMessageToSocketId(socketId, event, data) {
    if (io) {
        io.to(socketId).emit(event, data);
    } else {
        console.log('Socket.io not initialized');
    }
}

function broadcastToRoom(room, event, data) {
    if (io) {
        io.to(room).emit(event, data);
    } else {
        console.log('Socket.io not initialized');
    }
}

module.exports = { initializeSocket, sendMessageToSocketId, broadcastToRoom };
