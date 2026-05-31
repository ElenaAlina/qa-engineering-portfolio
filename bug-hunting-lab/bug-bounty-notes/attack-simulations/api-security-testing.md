
# API Security Testing Simulation

## Scope
REST API endpoints for user management

---

## Tests performed

### 1. Authentication bypass
- Tested endpoints without token
- Result: some endpoints accessible

---

### 2. IDOR testing
- Modified userId in requests
- Result: unauthorized data access found

---

### 3. Rate limiting
- Sent 100 requests/sec
- Result: no rate limiting detected

---

## Findings summary
- Missing authorization checks
- Weak rate limiting
- Potential data exposure

---

## Recommendations
- Implement JWT validation on all endpoints
- Add rate limiting (e.g. 429 responses)
- Enforce RBAC (Role-Based Access Control)
