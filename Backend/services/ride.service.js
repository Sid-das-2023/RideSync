const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');
const crypto = require('crypto');

async function getFare(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Pickup or destination are required');
    }

    const distanceTime = await mapService.getDistanceTime(origin, destination);

    const baseFare = {
        auto: 20,
        car: 30,
        motorcycle: 10
    };

    const fareRates = {
        auto: 10,
        car: 15,
        motorcycle: 6
    };

    const timeRates = {
        auto: 2,
        car: 3,
        motorcycle: 1
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * fareRates.auto) + (distanceTime.duration.value / 60 * timeRates.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * fareRates.car) + (distanceTime.duration.value / 60 * timeRates.car)),
        motorcycle: Math.round(baseFare.motorcycle + ((distanceTime.distance.value / 1000) * fareRates.motorcycle) + (distanceTime.duration.value / 60 * timeRates.motorcycle))
    };

    return fare;
}

module.exports.getFare = getFare;

function getOTP(num) {
    if (!num || num <= 0) {
        throw new Error('Number of digits must be greater than 0');
    }
    const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
    return otp;
}

module.exports.createRide = async ({
    userId,
    origin,
    destination,
    vehicleType
}) => {
    if (!userId || !origin || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fare = await getFare(origin, destination);
    const ride = await rideModel.create({
        user: userId,
        origin,
        destination,
        otp: getOTP(6),
        fare: fare[vehicleType]
    });

    return ride;
};

module.exports.acceptRide = async ({ rideId, captain }) => {
    const ride = await rideModel.findByIdAndUpdate(
        rideId,
        { status: 'accepted', captain: captain._id },
        { new: true }
    ).populate('user');

    if (!ride) throw new Error('Ride not found');
    return ride;
};

module.exports.startRide = async ({ rideId, otp }) => {
    const ride = await rideModel.findById(rideId).select('+otp').populate('user');
    if (!ride) throw new Error('Ride not found');
    if (ride.otp !== otp) throw new Error('Invalid OTP');

    const updatedRide = await rideModel.findByIdAndUpdate(
        rideId,
        { status: 'ongoing' },
        { new: true }
    ).populate('user');

    return updatedRide;
};

module.exports.completeRide = async ({ rideId }) => {
    const ride = await rideModel.findByIdAndUpdate(
        rideId,
        { status: 'completed' },
        { new: true }
    ).populate('user');

    if (!ride) throw new Error('Ride not found');
    return ride;
};
