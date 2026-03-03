const chalk = require('chalk');

/**
 * Logger utility for semantic colors
 */
const logger = {
  info: (msg) => console.log(chalk.cyan(msg)),
  success: (msg) => console.log(chalk.green(`\n✔ ${msg}`)),
  error: (msg) => console.log(chalk.red(`\n✖ ${msg}`)),
  warn: (msg) => console.log(chalk.yellow(`⚠ ${msg}`)),
  dim: (msg) => console.log(chalk.dim(msg)),
  bold: (msg) => console.log(chalk.bold(msg)),
  banner: (msg) => console.log(chalk.magenta.bold(msg))
};

module.exports = logger;
