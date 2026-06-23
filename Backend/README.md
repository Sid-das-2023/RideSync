# API Documentation

## POST /users/register

### Description

This endpoint registers a new user in the system. It requires the user's first name, email, and password. Optionally, the user can provide their last name.

### Request Body

- `fullname.firstname` (string, required): The first name of the user. Must be at least 3 characters long.
- `fullname.lastname` (string, optional): The last name of the user. Must be at least 3 characters long.
- `email` (string, required): A valid email address for the user. This will be used for login and communication purposes.
- `password` (string, required): A secure password for the user's account. Must be at least 6 characters long.

### Response Status Codes

- **201 Created**: The user was registered successfully. The response will include the user's ID and creation timestamp.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.

### Endpoint

`POST /users/register`

### Example Request

```json
{
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

### Example Response

```json
{
    "id": "1234567890abcdef",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-05T14:48:00.000Z"
}
```

### Additional Information

- Ensure that the email address provided is unique and not already registered in the system.
- Passwords should be stored securely using hashing algorithms.
- The `createdAt` field in the response indicates the timestamp when the user was registered.

## POST /users/login

### Description

This endpoint logs in an existing user. It requires the user's email and password.

### Request Body

- `email` (string, required): A valid email address for the user.
- `password` (string, required): The user's account password. Must be at least 6 characters long.

### Response Status Codes

- **200 OK**: The user was logged in successfully. The response will include the user's details and an authentication token.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.
- **401 Unauthorized**: The email or password provided is incorrect.

### Endpoint

`POST /users/login`

### Example Request

```json
{
    "email": "john.doe@example.com",
    "password": "securePassword123"
}
```

### Example Response

```json
{
    "id": "1234567890abcdef",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-05T14:48:00.000Z"
}
```

## GET /users/profile

### Description

This endpoint retrieves the profile of the logged-in user. It requires the user to be authenticated.

### Response Status Codes

- **200 OK**: The user's profile was retrieved successfully. The response will include the user's details.
- **401 Unauthorized**: The user is not authenticated.

### Endpoint

`GET /users/profile`

### Example Response

```json
{
    "id": "1234567890abcdef",
    "fullname": {
        "firstname": "John",
        "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "createdAt": "2023-10-05T14:48:00.000Z"
}
```

## POST /users/logout

### Description

This endpoint logs out the authenticated user. It requires the user to be authenticated.

### Response Status Codes

- **200 OK**: The user was logged out successfully.
- **401 Unauthorized**: The user is not authenticated.

### Endpoint

`POST /users/logout`

### Example Response

```json
{
    "message": "User logged out successfully."
}
```

## POST /captains/register

### Description

This endpoint registers a new captain in the system. It requires the captain's first name, last name, email, password, and vehicle details.

### Request Body

- `fullname.firstname` (string, required): The first name of the captain. Must be at least 3 characters long.
- `fullname.lastname` (string, required): The last name of the captain. Must be at least 3 characters long.
- `email` (string, required): A valid email address for the captain. This will be used for login and communication purposes.
- `password` (string, required): A secure password for the captain's account. Must be at least 6 characters long.
- `vehicle.color` (string, required): The color of the captain's vehicle. Must be at least 3 characters long.
- `vehicle.plate` (string, required): The plate number of the captain's vehicle. Must be at least 3 characters long.
- `vehicle.capacity` (number, required): The capacity of the captain's vehicle. Must be at least 1.
- `vehicle.vehicleType` (string, required): The type of the captain's vehicle. Must be one of 'car', 'motorcycle', or 'auto'.

### Response Status Codes

- **201 Created**: The captain was registered successfully. The response will include the captain's ID and creation timestamp.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.

### Endpoint

`POST /captains/register`

### Example Request
```json
{
    "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "password": "securePassword123",
    "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Example Response

```json
{
    "id": "abcdef1234567890",
    "fullname": {
        "firstname": "Jane",
        "lastname": "Smith"
    },
    "email": "jane.smith@example.com",
    "createdAt": "2023-10-05T14:48:00.000Z",
    "vehicle": {
        "color": "red",
        "plate": "XYZ123",
        "capacity": 4,
        "vehicleType": "car"
    }
}
```

### Additional Information

- Ensure that the email address provided is unique and not already registered in the system.
- Passwords should be stored securely using hashing algorithms.
- The `createdAt` field in the response indicates the timestamp when the captain was registered.

## POST /captains/login

### Description

This endpoint logs in an existing captain. It requires the captain's email and password.

### Request Body

- `email` (string, required): A valid email address for the captain.
- `password` (string, required): The captain's account password. Must be at least 6 characters long.

### Response Status Codes

- **200 OK**: The captain was logged in successfully. The response will include the captain's details and an authentication token.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.
- **401 Unauthorized**: The email or password provided is incorrect.

### Endpoint

`POST /captains/login`

### Example Request

```json
{
    "email": "jane.smith@example.com",
    "password": "securePassword123"
}
```

### Example Response

```json
{
    "token": "jwt_token_here",
    "captain": {
        "id": "abcdef1234567890",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "createdAt": "2023-10-05T14:48:00.000Z",
        "vehicle": {
            "color": "red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## GET /captains/profile

### Description

This endpoint retrieves the profile of the logged-in captain. It requires the captain to be authenticated.

### Response Status Codes

- **200 OK**: The captain's profile was retrieved successfully. The response will include the captain's details.
- **401 Unauthorized**: The captain is not authenticated.

### Endpoint

`GET /captains/profile`

### Example Response

```json
{
    "captain": {
        "id": "abcdef1234567890",
        "fullname": {
            "firstname": "Jane",
            "lastname": "Smith"
        },
        "email": "jane.smith@example.com",
        "createdAt": "2023-10-05T14:48:00.000Z",
        "vehicle": {
            "color": "red",
            "plate": "XYZ123",
            "capacity": 4,
            "vehicleType": "car"
        }
    }
}
```

## POST /captains/logout

### Description

This endpoint logs out the authenticated captain. It requires the captain to be authenticated.

### Response Status Codes

- **200 OK**: The captain was logged out successfully.
- **401 Unauthorized**: The captain is not authenticated.

### Endpoint

`POST /captains/logout`

### Example Response

```json
{
    "message": "Logout successfully"
}
```
## POST /rides/request

### Description

This endpoint requests a new ride. It requires the user's ID, pickup location, and drop-off location.

### Request Body

- `userId` (string, required): The ID of the user requesting the ride.
- `pickupLocation` (object, required): The pickup location details.
    - `latitude` (number, required): The latitude of the pickup location.
    - `longitude` (number, required): The longitude of the pickup location.
- `dropoffLocation` (object, required): The drop-off location details.
    - `latitude` (number, required): The latitude of the drop-off location.
    - `longitude` (number, required): The longitude of the drop-off location.

### Response Status Codes

- **201 Created**: The ride was requested successfully. The response will include the ride's ID and details.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.

### Endpoint

`POST /rides/request`

### Example Request

```json
{
        "userId": "1234567890abcdef",
        "pickupLocation": {
                "latitude": 37.7749,
                "longitude": -122.4194
        },
        "dropoffLocation": {
                "latitude": 37.7849,
                "longitude": -122.4094
        }
}
```

### Example Response

```json
{
        "rideId": "abcdef1234567890",
        "userId": "1234567890abcdef",
        "pickupLocation": {
                "latitude": 37.7749,
                "longitude": -122.4194
        },
        "dropoffLocation": {
                "latitude": 37.7849,
                "longitude": -122.4094
        },
        "status": "requested",
        "createdAt": "2023-10-05T14:48:00.000Z"
}
```

## GET /rides/status

### Description

This endpoint retrieves the status of a ride. It requires the ride ID.

### Query Parameters

- `rideId` (string, required): The ID of the ride.

### Response Status Codes

- **200 OK**: The ride status was retrieved successfully. The response will include the ride's details.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.
- **404 Not Found**: The ride with the specified ID was not found.

### Endpoint

`GET /rides/status`

### Example Response

```json
{
        "rideId": "abcdef1234567890",
        "userId": "1234567890abcdef",
        "pickupLocation": {
                "latitude": 37.7749,
                "longitude": -122.4194
        },
        "dropoffLocation": {
                "latitude": 37.7849,
                "longitude": -122.4094
        },
        "status": "in-progress",
        "createdAt": "2023-10-05T14:48:00.000Z",
        "updatedAt": "2023-10-05T15:00:00.000Z"
}
```

## POST /rides/cancel

### Description

This endpoint cancels a ride. It requires the ride ID and the user ID.

### Request Body

- `rideId` (string, required): The ID of the ride to be canceled.
- `userId` (string, required): The ID of the user canceling the ride.

### Response Status Codes

- **200 OK**: The ride was canceled successfully.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.
- **404 Not Found**: The ride with the specified ID was not found.

### Endpoint

`POST /rides/cancel`

### Example Request

```json
{
        "rideId": "abcdef1234567890",
        "userId": "1234567890abcdef"
}
```

### Example Response

```json
{
        "message": "Ride canceled successfully."
}
```

## GET /map/directions

### Description

This endpoint retrieves directions between two locations. It requires the start and end locations.

### Query Parameters

- `startLatitude` (number, required): The latitude of the start location.
- `startLongitude` (number, required): The longitude of the start location.
- `endLatitude` (number, required): The latitude of the end location.
- `endLongitude` (number, required): The longitude of the end location.

### Response Status Codes

- **200 OK**: The directions were retrieved successfully. The response will include the directions details.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.

### Endpoint

`GET /map/directions`

### Example Response

```json
{
        "startLocation": {
                "latitude": 37.7749,
                "longitude": -122.4194
        },
        "endLocation": {
                "latitude": 37.7849,
                "longitude": -122.4094
        },
        "directions": [
                {
                        "step": "Head north on Market St",
                        "distance": "0.5 miles",
                        "duration": "2 mins"
                },
                {
                        "step": "Turn right onto 5th St",
                        "distance": "0.3 miles",
                        "duration": "1 min"
                }
        ]
}
```

## GET /map/nearby-captains

### Description

This endpoint retrieves nearby captains based on the user's location. It requires the user's location.

### Query Parameters

- `latitude` (number, required): The latitude of the user's location.
- `longitude` (number, required): The longitude of the user's location.

### Response Status Codes

- **200 OK**: The nearby captains were retrieved successfully. The response will include the captains' details.
- **400 Bad Request**: There were validation errors with the provided data. The response will include details about the validation errors.

### Endpoint

`GET /map/nearby-captains`

### Example Response

```json
{
        "captains": [
                {
                        "id": "captain123",
                        "fullname": {
                                "firstname": "Alice",
                                "lastname": "Johnson"
                        },
                        "vehicle": {
                                "color": "blue",
                                "plate": "ABC123",
                                "capacity": 4,
                                "vehicleType": "car"
                        },
                        "location": {
                                "latitude": 37.7750,
                                "longitude": -122.4183
                        }
                },
                {
                        "id": "captain456",
                        "fullname": {
                                "firstname": "Bob",
                                "lastname": "Williams"
                        },
                        "vehicle": {
                                "color": "black",
                                "plate": "XYZ789",
                                "capacity": 2,
                                "vehicleType": "motorcycle"
                        },
                        "location": {
                                "latitude": 37.7760,
                                "longitude": -122.4173
                        }
                }
        ]
}
```

`GET /get-fare`
```json
{
    "auto": 50.0,
    "car": 75.0,
    "motorcycle": 30.0
}
```

### Additional Information

- Ensure that the captain is authenticated before making this request.
- The token used for authentication will be blacklisted to prevent further use.