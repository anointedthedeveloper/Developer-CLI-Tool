#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const initCommand = require('../src/commands/init');
const { handleError } = require('../src/utils/errors');
const logger = require('../src/utils/logger');

/**
 * CLI Entry Point
 */
program
  .name('developer-cli-tool')
  .description('Production-ready React + Tailwind + Router + Auth starter CLI')
  .version(pkg.version);

program
  .command('init')
  .description('Initialize a new production-ready React project')
  .argument('[project-name]', 'Name of the project to create')
  .option('-t, --template <template>', 'Template to use (premium, minimal)', 'premium')
  .option('-p, --package-manager <manager>', 'Package manager to use (npm, yarn, pnpm)', 'npm')
  .option('-y, --yes', 'Skip prompts and use defaults', false)
  .option('-g, --git', 'Initialize git repository', true)
  .option('-i, --install', 'Install dependencies', true)
  .option('-f, --force', 'Overwrite directory if not empty', false)
  .action(async (projectName, options) => {
    try {
      await initCommand(projectName, options);
    } catch (err) {
      handleError(err, logger);
    }
  });

// Handle unknown commands
program.on('command:*', () => {
  logger.error(`Invalid command: ${program.args.join(' ')}\nSee --help for a list of available commands.`);
  process.exit(1);
});

program.parse(process.argv);

// Display help if no arguments provided
if (!process.argv.slice(2).length) {
  program.outputHelp();
}
