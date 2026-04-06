#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const initCommand = require('../src/commands/init');
const { handleError } = require('../src/utils/errors');
const logger = require('../src/utils/logger');

program
  .name('create-nexusapp')
  .description('Production-ready React + Tailwind + Router + Auth starter CLI')
  .version(pkg.version)
  .argument('[project-name]', 'Name of the project to create')
  .option('-t, --template <template>', 'Template to use (basic, minimal)', 'basic')
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

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
