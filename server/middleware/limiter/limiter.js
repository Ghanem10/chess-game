import rateLimiter from 'express-rate-limit';
const MESSAGE = "Too many requests, please try again later.";

const createLimiter = (windowMs, maxRate, message) => {
    return rateLimiter ({
        windowMs,
        maxRate,
        message: { message: message }
    });
};

const inviteLimiter = createLimiter(15 * 60 * 1000, 100, MESSAGE);
const signUpAndSignInLimiter = createLimiter(15 * 60 * 1000, 100, MESSAGE);

export { inviteLimiter, signUpAndSignInLimiter };