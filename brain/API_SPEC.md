# API Specification

## Principle
Only the contact endpoint is expected to be required for v1. GitHub metadata is optional and should be fetched at build time or through a bounded cache rather than on every page view.

## `POST /api/contact`
Purpose: deliver a visitor's message to the approved contact email through Resend.

### Request
```json
{
  "name": "Example Visitor",
  "email": "visitor@example.com",
  "message": "I'd like to discuss your project."
}
```
- `name`: required, trimmed, 2–80 characters.
- `email`: required, valid email, maximum 254 characters.
- `message`: required, trimmed, 10–3000 characters.
- Optional honeypot field may be added; never treat it as trusted security by itself.
- Validate with Zod on the server. Client validation is UX only.

### Success response
```json
{
  "ok": true,
  "message": "Your message has been sent."
}
```
Do not return provider IDs or internal details.

### Error format
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Please check the highlighted fields."
  }
}
```

### Status codes
- `200`: accepted and successfully delivered to provider.
- `400`: malformed/invalid input.
- `413`: payload too large.
- `429`: rate limit reached.
- `500`: missing server configuration or provider failure; generic user-facing message only.

### Auth and abuse controls
- No visitor account/authentication.
- Server-only Resend key.
- Enforce request body and field-length limits.
- Rate limiting: choose an implementation after service availability is confirmed; for a 4-hour build, prefer provider/edge protection and honeypot plus conservative limits. Do not claim robust rate limiting unless it is implemented and tested.
- Do not store contact submissions by default.
- Add request correlation ID to server logs; never log full message body or secret values.

## Optional GitHub metadata
- Source: public GitHub repository endpoints.
- Not a required custom API route in v1.
- If a proxy route is added, cache responses, bound timeouts, validate repository names, and return local fallback data on failure.
- Unauthenticated API limits must be verified on official GitHub documentation before implementation.

## OpenAPI
Formal OpenAPI generation is not required for this small project. Add only if the API surface grows.
