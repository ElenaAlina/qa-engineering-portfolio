# Access Control Testing Methodology

## 1. Create Multiple Accounts
- User A
- User B

## 2. Map Functionality
- Profile
- Orders
- Settings
- Messages
- Documents

## 3. Capture Requests
Using Burp Suite:
- GET requests
- POST requests
- API calls

## 4. Test Horizontal Access Control

Can User A access:

- User B profile
- User B files
- User B messages
- User B settings

Modify:
- IDs
- UUIDs
- Account references

## 5. Test Vertical Access Control

Can a normal user access:

- Admin pages
- Admin APIs
- Moderator functions
- Restricted actions

## 6. Test Forced Browsing

Try:

- /admin
- /dashboard/admin
- /manage-users
- /internal

## 7. Verify Impact

Determine:

- Read access
- Modify access
- Delete access
- Account takeover potential

## 8. Report
Document:
- Request
- Response
- Impact
- Remediation
