# Event Service Tests

These tests ensure the core event management functionality works as expected. They cover creating, retrieving, and saving events, including scenarios like searching by ID, name, or faculty. Tests also check how the service handles missing data. By using mock repositories, the tests focus solely on the business logic, making sure the service behaves correctly and maintains data integrity without relying on the actual database.

# Event Controller Tests

These tests verify that the event-related API endpoints function as intended. They focus on real-world use cases, especially the endpoint that handles both data and file uploads together. The tests check that:

- Event creation works correctly with file uploads
- All GET endpoints return accurate information
- Errors are handled 
- Responses are consistent

The goal is to ensure the API remains reliable and easy to use for developers integrating w it.

# Faculty Controller Tests

These unit tests check the REST API layer in the FacultyController class. The service layer is mocked so that the focus stays on how the API behaves. Tests verify:

- Proper HTTP status codes are returned
- JSON response structures remain consistent
- Errors from the service layer are translated into appropriate HTTP error responses

This makes sure that even if the underlying logic changes, the API remains stable.

# Faculty Service Tests

These tests focus on the core business logic inside the FacultyService class. They mock the database layer to test things like:

- Accurate data retrieval
- Proper exception handling for invalid cases
- Correct calculations, such as student counts

By isolating the service from both the web layer and the database, these tests ensure that the core logic is solid and reliable no matter how other parts of the system evolve.

# Student Service Tests

The StudentServiceTest class checks the main business logic for handling student-related operations. It covers scenarios like:

- Successfully retrieving a student by user ID
- Handling cases where a student doesn’t exist
- Fetching students by faculty ID or roll number
- Mapping data to StudentDashboardDTO objects correctly

Using mock repositories, these tests confirm that the service interacts with the data layer as expected, handles edge cases properly, and returns well-structured results to the controller.

# Student Controller Tests

These tests focus on the API layer exposed by the StudentController. They verify that endpoints:

- Send requests to the service layer properly
- Return the correct responses for both valid and invalid data
- Maintain separation between controller logic and business logic

With the service layer mocked, the tests stay focused on how the API behaves in different scenarios.

# Request Service Tests

The RequestServiceTest checks how the system handles student activity requests—from submission to approval. It covers:

- Submitting requests for both event-based and custom activities
- Retrieving requests by status (approved, rejected, pending)
- Updating request statuses and allocating points correctly

The tests ensure that the approval workflow works smoothly across different user roles (students, faculty advisors, coordinators) and that all data integrity checks are properly enforced.

# Request Controller Tests

These tests validate the REST endpoints that handle request operations. They ensure that:

- Submissions, retrievals, and status updates work correctly
- The API returns the right HTTP codes and response formats
- Inputs are validated, and errors are clearly communicated

By mocking the service layer, the tests focus on making sure the controller acts as a reliable bridge between the frontend and backend, keeping the system user-friendly.
