# Medical Tourism Enquiry – API Structure

Use this for the **Medical Tourism** page enquiry form. All enquiries from this form should be stored and handled separately from general contact form submissions.

---

## Endpoint

| Method | Path | Description |
|--------|------|--------------|
| `POST` | `/medical-tourism-enquiry` | Submit a medical tourism enquiry |

---

## Request (Payload)

| Field | Type | Required | Description |
|-------|------|----------|--------------|
| `fullName` | string | Yes | Patient / contact person full name |
| `email` | string | Yes | Email address |
| `phone` | string | Yes | Phone number (with country code if possible) |
| `country` | string | Yes | Country of residence |
| `treatmentInterest` | string | No | Treatment or procedure of interest (e.g. "Knee Replacement", "IVF", "Cardiac Surgery") |
| `enquiryType` | string | No | One of: `"medical_opinion"`, `"cost_estimate"`, `"general"` – from which CTA the user came |
| `message` | string | No | Additional message, medical details, or questions |
| `preferredContact` | string | No | One of: `"email"`, `"phone"`, `"whatsapp"` |
| `expectedTravelDate` | string | No | Approximate expected travel date (e.g. `"2025-03"` or free text) |

---

## Example Payload (JSON)

```json
{
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "phone": "+1234567890",
  "country": "Kenya",
  "treatmentInterest": "Knee Replacement",
  "enquiryType": "cost_estimate",
  "message": "I would like to know the approximate cost and duration of stay for knee replacement surgery.",
  "preferredContact": "whatsapp",
  "expectedTravelDate": "2025-04"
}
```

---

## Suggested Response (Success)

**Status:** `201 Created` or `200 OK`

**Body (example):**

```json
{
  "success": true,
  "message": "Enquiry submitted successfully. We will contact you within 24 hours.",
  "data": {
    "id": "enquiry-uuid-or-id",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "createdAt": "2025-02-11T10:30:00.000Z"
  }
}
```

---

## Suggested Response (Validation Error)

**Status:** `400 Bad Request`

**Body (example):**

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": "Invalid email address",
    "phone": "Phone number is required"
  }
}
```

---

## Backend Implementation Notes

- Store submissions in a dedicated table/collection (e.g. `medical_tourism_enquiries`) so they can be filtered and assigned to the International Patient Desk.
- Optional: send an auto-reply email and/or notify internal team (Slack/email) when a new enquiry is received.
- `enquiryType` can be used for reporting: e.g. count of “medical opinion” vs “cost estimate” requests.
