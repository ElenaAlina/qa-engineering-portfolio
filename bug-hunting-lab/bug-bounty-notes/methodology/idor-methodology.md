# IDOR (Insecure Direct Object Reference) Methodology

## What is IDOR?
IDOR is a vulnerability that occurs when an application exposes internal object references and does not properly enforce access control.

## Where to look for IDOR
- URL parameters: /user/123
- API endpoints: /api/v1/orders/1001
- Hidden fields in forms
- JSON requests (PUT / PATCH)

---

## How to test (step-by-step)

### 1. Identify object references
Look for IDs like:
- userId
- accountId
- orderId

### 2. Modify the ID
Change values:
- 1001 → 1002
- user/123 → user/124

### 3. Check response
If you can access data that is not yours → possible IDOR.

---

## Authentication vs Authorization check
- Authentication = are you logged in?
- Authorization = are you allowed to access this data?

IDOR is an authorization issue.

---

## Common impact
- Data leakage
- Account takeover
- Privilege escalation

---

## Prevention
- Use indirect references (UUIDs)
- Enforce server-side authorization checks
- Never trust client-side IDs

# Examples:

## 1. Create Multiple Accounts
Create at least two accounts:

- User A
- User B

Purpose:
Verify whether resources belonging to User B can be accessed by User A.

## 2. Capture Requests

Use Burp Suite Proxy or Repeater.

Focus on:

- user_id
- account_id
- order_id
- document_id

## 3. Identify Object References

Examples:

user_id
order_id
file_id
document_id

## 4. Modify References

Replace:

IDs
UUIDs
Account references

## 5. Replay Request

Observe response.

## 6. Verify Impact

Can you:

Read?
Modify?
Delete?

## 7. Document
Request
Response
Impact

9. Report
