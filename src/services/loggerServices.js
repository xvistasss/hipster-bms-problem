// Lightweight structured logger.
// Responsibilities:
// - Log user actions
// - Log API errors
// - Keep logging reusable across app modules

const buildLog = (level, event, payload = {}) => ({
  level,
  event,
  payload,
  timestamp: new Date().toISOString(),
});

export const loggerService = {
  info(event, payload = {}) {
    console.log(buildLog('INFO', event, payload));
  },

  warn(event, payload = {}) {
    console.warn(buildLog('WARN', event, payload));
  },

  error(event, payload = {}) {
    console.error(buildLog('ERROR', event, payload));
  },
};
