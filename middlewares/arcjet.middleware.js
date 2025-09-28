import aj from '../config/arcjet.js';

const arcjetMiddleware = async (req, res, next) => {
  try {
    // Skip Arcjet entirely in dev if you want absolute Postman freedom
    if (process.env.NODE_ENV === "development") {
      return next();
    }

    const decision = await aj.protect(req, { requested: 1 });
    const reason = decision.reason;

    if (decision.isDenied && decision.isDenied()) {
      if (reason?.isRateLimit?.()) {
        return res.status(429).json({ error: 'Rate Limit Exceeded' });
      }

      if (reason?.isBot?.()) {
        return res.status(403).json({ error: 'Bot detected' });
      }

      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.log(`Arcjet Middleware Error: ${error}`);
    next(error);
  }
};

export default arcjetMiddleware;
