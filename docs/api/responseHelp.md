---
title: responseHelp
description: Returns a string with a description of the error.
---

## responseHelp variable

Returns a string with a description of the error.

**Signature:**

```ts
_default: (status: number) => "BAD REQUEST. Verify the request URL, headers, and body parameters." | "UNAUTHORIZED. No API key was found, please make sure you're providing one." | "FORBIDDEN. Your API key is invalid/blacklisted or you don't have access to the requested resource." | "NOT FOUND. The requested resource was not found." | "UNSUPPORTED MEDIA TYPE. The provided body is of an invalid type." | "RATE LIMIT EXCEEDED." | "INTERNAL SERVER ERROR. The server encountered an error. Please try again later." | "SERVICE UNAVAILABLE. The server is down. Please try again later." | "UNKNOWN ERROR."
```

