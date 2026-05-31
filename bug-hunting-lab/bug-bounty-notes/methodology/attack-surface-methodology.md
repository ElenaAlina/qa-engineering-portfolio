# Attack Surface Methodology

## 1. Scope Review

- Read program rules
- Identify in-scope assets
- Note restricted testing

---

## 2. Recon

### Asset Discovery

Identify:

- Main application
- Subdomains
- APIs
- Mobile endpoints

### Technology Fingerprinting

Identify:

- Framework
- Web server
- JavaScript libraries
- Authentication providers

### Content Discovery

Review:

- robots.txt
- sitemap.xml
- JavaScript files
- Public documentation

### Endpoint Discovery

Look for:

- Hidden pages
- API endpoints
- Parameters
- Admin functionality

---

## 3. User Role Mapping

Create multiple accounts if possible:

### Anonymous User

What can be accessed without login?

### Standard User

What functionality is available?

### Admin Features

Identify:

- Admin endpoints
- Management functionality
- Restricted APIs

---

## 4. Access Control Testing

### Horizontal Access Control

Test whether User A can access User B resources.

Examples:

- Profiles
- Orders
- Messages
- Uploaded files
- Settings

Modify:

- IDs
- UUIDs
- Account references

Questions:

- Can I read data?
- Can I modify data?
- Can I delete data?

---

### Vertical Access Control

Test whether a normal user can access privileged functionality.

Examples:

- Admin panels
- Moderator features
- Internal APIs

Try:

- Direct URL access
- Modified requests
- Hidden endpoints

---

## 5. IDOR Testing

Identify object references:

- user_id
- order_id
- file_id
- document_id
- invoice_id

Capture requests using Burp Suite.

Modify identifiers and replay requests.

Verify:

- Unauthorized read access
- Unauthorized modification
- Unauthorized deletion

Document all successful cases.

---

## 6. Business Logic Testing

Understand intended workflow.

Example:

Registration
→ Login
→ Purchase
→ Payment
→ Order Confirmation

---

### Workflow Manipulation

Ask:

- Can I skip a step?
- Can I repeat a step?
- Can I change the order?

---

### Parameter Manipulation

Modify:

- Prices
- Quantities
- Discounts
- Subscription levels
- Reward points

---

### Abuse Testing

Examples:

- Reuse coupons
- Multiple refunds
- Unlimited free trials
- Duplicate transactions

---

### Race Conditions

Test:

- Concurrent requests
- Multiple submissions
- Rapid actions

---

## 7. Impact Assessment

Determine impact:

### Confidentiality

Can sensitive data be accessed?

### Integrity

Can data be modified?

### Financial Impact

Can money be gained or lost?

### Privilege Escalation

Can permissions be increased?

---

## 8. Documentation

Record:

- Endpoint
- Request
- Response
- User role
- Impact
- Screenshots
- Proof of Concept

---

## 9. Reporting

Prepare:

- Clear title
- Summary
- Steps to reproduce
- Proof of Concept
- Impact
- Remediation
