// Lightweight structured logger.
// Responsibilities:
// - Log user actions
// - Log API errors
// - Keep logging reusable across app modules

export const loggerService = {
  info(event, payload = {}) {
    console.log(`[INFO] ${event}`, payload);
  },

  error(event, payload = {}) {
    console.error(`[ERROR] ${event}`, payload);
  },
};
