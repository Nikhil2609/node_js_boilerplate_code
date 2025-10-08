import rateLimiter from 'express-rate-limit';

export const rateLimiterMiddleware = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1, // limit each IP to 15 requests per windowMs
  message: { error: 'Too many requests, please try again after 15 minutes' }
});
