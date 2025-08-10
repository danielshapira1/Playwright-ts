1. Title: Create booking with valid data
Description: Verify that a booking can be successfully created by sending a valid JSON payload.
Expected Result:
The API should return HTTP status 200 OK or 201 Created.

2. Title: Create booking with missing required field
Description: Attempt to create a booking while omitting one or more mandatory fields.
Expected Result:
The API should return HTTP status 400 Bad Request with an error message indicating the missing fields.

3. Title: Retrieve booking that does not exist
Description: Send a GET request to /booking/{id} using a non-existent or invalid booking ID.
Expected Result:
The API should return HTTP status 404 Not Found with a message indicating that the booking was not found.

4. Title: Update booking with Invalid Token
Description: Try to update a booking using the PUT /booking/{id} endpoint while providing an expired or incorrect authentication token.
Expected Result:
The API should return 401 Unauthorized or 403 Forbidden, and the booking should not be modified.

5. Title: Create booking with overlapping dates
Description: Attempt to create a booking for a room that is already booked during the selected check-in and check-out dates.
Expected Result:
The API should return a 409 Conflict or 422 Unprocessable Entity response, depending on business rules, indicating a date conflict or booking restriction.