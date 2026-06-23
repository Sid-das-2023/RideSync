const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const { sendMessageToSocketId, broadcastToRoom } = require('../socket');

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination, vehicleType } = req.body;

    try {
        const ride = await rideService.createRide({
            userId: req.user._id,
            origin,
            destination,
            vehicleType
        });
        broadcastToRoom('captains', 'new-ride', ride);
        res.status(201).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { origin, destination } = req.query;

    try {
        const fare = await rideService.getFare(origin, destination);
        res.status(200).json(fare);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.acceptRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;

    try {
        const ride = await rideService.acceptRide({ rideId, captain: req.captain });
        if (ride.user.socketId) {
            sendMessageToSocketId(ride.user.socketId, 'ride-confirmed', ride);
        }
        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId, otp } = req.body;

    try {
        const ride = await rideService.startRide({ rideId, otp });
        res.status(200).json(ride);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports.completeRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { rideId } = req.body;

    try {
        const ride = await rideService.completeRide({ rideId });
        res.status(200).json(ride);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
