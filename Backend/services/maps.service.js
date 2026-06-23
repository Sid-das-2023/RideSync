const axios = require("axios");

const NOMINATIM = "https://nominatim.openstreetmap.org";
const OSRM = "http://router.project-osrm.org";

const headers = { "User-Agent": "RideSync/1.0" };

module.exports.getAddressCordinate = async (address) => {
  const response = await axios.get(`${NOMINATIM}/search`, {
    params: { q: address, format: "json", limit: 1 },
    headers,
  });

  if (!response.data.length) {
    throw new Error("Unable to find location");
  }

  const { lat, lon } = response.data[0];
  return { lat: parseFloat(lat), lng: parseFloat(lon) };
};

module.exports.getDistanceTime = async (origin, destination) => {
  if (!origin || !destination) {
    throw new Error("Origin and destination are required");
  }

  const geocode = async (place) => {
    const res = await axios.get(`${NOMINATIM}/search`, {
      params: { q: place, format: "json", limit: 1 },
      headers,
    });
    if (!res.data.length) throw new Error(`Location not found: ${place}`);
    return { lat: parseFloat(res.data[0].lat), lng: parseFloat(res.data[0].lon) };
  };

  const [o, d] = await Promise.all([geocode(origin), geocode(destination)]);

  const response = await axios.get(
    `${OSRM}/route/v1/driving/${o.lng},${o.lat};${d.lng},${d.lat}`,
    { params: { overview: "false" } }
  );

  if (!response.data.routes?.length) {
    throw new Error("No route found");
  }

  const route = response.data.routes[0];
  const distanceM = Math.round(route.distance);
  const durationS = Math.round(route.duration);

  return {
    distance: {
      value: distanceM,
      text: `${(distanceM / 1000).toFixed(1)} km`,
    },
    duration: {
      value: durationS,
      text: `${Math.ceil(durationS / 60)} mins`,
    },
  };
};

module.exports.getAutoCompleteSuggestions = async (input) => {
  if (!input) throw new Error("Query is required");

  const response = await axios.get(`${NOMINATIM}/search`, {
    params: { q: input, format: "json", limit: 5, addressdetails: 1 },
    headers,
  });

  return response.data.map((place) => ({
    description: place.display_name,
  }));
};
