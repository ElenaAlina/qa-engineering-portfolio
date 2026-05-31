# IDOR Methodology

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
