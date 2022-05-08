export default (status: number) => {
  switch (status) {
    case 400:
      return 'Verify the request URL, headers, and body parameters.';
    case 401:
      return "No API key was found, please make sure you're providing one.";
    case 403:
      return "Either your API key is invalid/blacklisted or you don't have access to the requested resource.";
    case 404:
      return 'The requested resource was not found.';
    case 415:
      return 'The provided body is of an invalid type.';
    case 429:
      return 'You have reached the rate limit.';
    case 500:
      return 'The server encountered an error. Please try again later.';
    case 503:
      return 'The server is down. Please try again later.';
    default:
      return 'Unknown error.';
  }
};
