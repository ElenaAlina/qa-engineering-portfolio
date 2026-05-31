# Business Logic Testing Methodology

## 1. Understand the Process

Examples:

- Registration
- Checkout
- Refunds
- Coupon usage
- Subscription management

## 2. Define Expected Workflow

Example:

Add product
→ Checkout
→ Pay
→ Receive order

## 3. Break the Workflow

Ask:

- Can I skip a step?
- Can I repeat a step?
- Can I change the order?

## 4. Test Parameter Manipulation

Modify:

- Price
- Quantity
- Discounts
- User IDs
- Subscription levels

## 5. Test Race Conditions

Send:

- Multiple requests
- Concurrent requests
- Duplicate actions

## 6. Test Abuse Cases

Examples:

- Reuse coupon multiple times
- Negative quantities
- Multiple refunds
- Unlimited free trials

## 7. Assess Business Impact

Can attacker:

- Gain money?
- Bypass payment?
- Access premium features?
- Abuse rewards?

## 8. Report

Include:

- Business impact
- Technical impact
- Steps to reproduce
- Recommendations
