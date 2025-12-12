/**
 * Enum for error messages, by status code.
 * Also suggests what the issue might be.
 */
export enum ShieldbowErrorMessage {
  'Bad request, you probably provided invalid parameters, or the request is broken.' = 400,
  'Unauthorized, please make sure a valid API key is provided.' = 401,
  'Forbidden, your API key may be expired or blacklisted.' = 403,
  'Not found, the requested resource does not exist.' = 404,
  'Method not allowed, the request method is not allowed (shieldbow oof).' = 405,
  'Unsupported media type, the request is not of a supported type.' = 415,
  "I'm a teapot, the server is a teapot (riot meme)." = 418,
  'Too many requests, you have exceeded the rate limit (shieldbow oof).' = 429,
  'Internal server error, the server encountered an internal error (riot oof).' = 500,
  'Bad gateway, the server is down or being upgraded (riot oof).' = 502,
  'Service unavailable, the server is overloaded or down (riot oof).' = 503,
  'Gateway timeout, the server timed out (riot oof).' = 504
}

/**
 * Error class for Shieldbow errors.
 */
export class ShieldbowError extends Error {
  constructor(debug: string, statusCode: number) {
    const message = `Shieldbow error while: ${debug}\n\nStatus Code: ${statusCode}\n\nDetails: ${
      ShieldbowErrorMessage[statusCode] || 'Unknown issue.'
    }`;
    super(message);
  }
}
