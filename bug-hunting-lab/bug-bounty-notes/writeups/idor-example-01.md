# IDOR Example

Endpoint:

GET /api/user/123

Logged in as:

User A

Modified request:

GET /api/user/124

Result:

User B profile returned.

Impact:

Unauthorized access to personal information.
