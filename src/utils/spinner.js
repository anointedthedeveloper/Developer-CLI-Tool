const ora = require('ora');
const chalk = require('chalk');

/**
 * Ora wrapper for async operations feedback
 */
class Spinner {
  constructor() {
    this.spinner = ora({
      color: 'cyan',
      spinner: 'dots'
    });
  }

  start(text) {
    this.spinner.text = chalk.cyan(text);
    this.spinner.start();
  }

  succeed(text) {
    this.spinner.succeed(chalk.green(text));
  }

  fail(text) {
    this.spinner.fail(chalk.red(text));
  }

  info(text) {
    this.spinner.info(chalk.blue(text));
  }

  stop() {
    this.spinner.stop();
  }
}

module.exports = new Spinner();
