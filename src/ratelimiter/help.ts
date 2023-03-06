/**
 * Returns a string with a description of the error.
 * @param status - The status code.
 */
export default (status: number) => {
  switch (status) {
    case 400:
      return 'BAD REQUEST. Verify the request URL, headers, and body parameters.';
    case 401:
      return "UNAUTHORIZED. No API key was found, please make sure you're providing one.";
    case 403:
      return "FORBIDDEN. Your API key is invalid/blacklisted or you don't have access to the requested resource.";
    case 404:
      return 'NOT FOUND. The requested resource was not found.';
    case 415:
      return 'UNSUPPORTED MEDIA TYPE. The provided body is of an invalid type.';
    case 429:
      return 'RATE LIMIT EXCEEDED.';
    case 500:
      return 'INTERNAL SERVER ERROR. The server encountered an error. Please try again later.';
    case 503:
      return 'SERVICE UNAVAILABLE. The server is down. Please try again later.';
    default:
      return 'UNKNOWN ERROR.';
  }
};
