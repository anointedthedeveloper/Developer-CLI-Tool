/**
 * Custom Error class for CLI-related issues
 */
class CLIError extends Error {
  constructor(message, exitCode = 1) {
    super(message);
    this.name = 'CLIError';
    this.exitCode = exitCode;
    this.isCLIError = true;
  }
}

/**
 * Handle unexpected errors and exit gracefully
 * @param {Error} err 
 * @param {object} logger 
 */
const handleError = (err, logger) => {
  if (err.isCLIError) {
    logger.error(err.message);
  } else {
    logger.error('An unexpected error occurred: ' + (err.stack || err.message));
  }
  process.exit(err.exitCode || 1);
};

module.exports = {
  CLIError,
  handleError
};
