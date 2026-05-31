# XSS (Cross-Site Scripting) Methodology

## What is XSS?
XSS allows injection of malicious JavaScript into web pages viewed by other users.

---

## Types of XSS
- Reflected
- Stored
- DOM-based

---

## Where to test
- Search fields
- URL parameters
- Comments sections
- Profile inputs

---

## Basic payloads
```html
<script>alert(1)</script>
"><img src=x onerror=alert(1)>
