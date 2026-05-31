```markdown
# Broken Access Control Simulation

## Objective
Test if unauthorized users can access restricted resources.

---

## Test scenario

User A:
- accountId = 1001

User B:
- accountId = 1002

---

## Steps performed

1. Logged in as User A
2. Intercepted request:
   GET /api/v1/account/1001
3. Modified request:
   GET /api/v1/account/1002

---

## Result
User A was able to access User B data.

---

## Impact
- Sensitive data exposure
- Violation of access control policies

---

## Severity
High

---

## Fix recommendation
- Enforce authorization checks on backend
- Validate ownership of resource
