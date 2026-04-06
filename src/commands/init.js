const path = require('path');
const inquirer = require('inquirer');
const { validateProjectName, isDirectoryEmpty } = require('../utils/validation');
const { generateProject } = require('../generators/project-generator');
const { installDependencies, initGit } = require('../generators/dependency-installer');
const logger = require('../utils/logger');
const spinner = require('../utils/spinner');
const messages = require('../constants/messages');
const { CLIError } = require('../utils/errors');

/**
 * Handle the 'init' command
 * @param {string} projectName 
 * @param {object} options 
 */
const initCommand = async (projectName, options) => {
  try {
    // 1. Initial Welcome
    logger.banner(messages.BANNER);
    logger.info(messages.WELCOME);

    let finalProjectName = projectName;
    let finalOptions = { ...options };

    // 2. Resolve missing project name or use defaults if --yes
    if (!finalProjectName && !options.yes) {
      const { name } = await inquirer.prompt([
        {
          type: 'input',
          name: 'name',
          message: 'Project name:',
          default: 'nexus-app',
          validate: validateProjectName
        }
      ]);
      finalProjectName = name;
    } else if (!finalProjectName) {
      finalProjectName = 'nexus-app';
    }

    const projectPath = path.resolve(process.cwd(), finalProjectName);

    // 3. Validation
    const nameValidation = validateProjectName(finalProjectName);
    if (nameValidation !== true) {
      throw new CLIError(messages.ERROR_INVALID_NAME(nameValidation));
    }

    const dirEmpty = await isDirectoryEmpty(projectPath, options.force);
    if (!dirEmpty) {
      throw new CLIError(messages.ERROR_DIR_NOT_EMPTY);
    }

    // 4. Interactive Prompts (only if not --yes)
    if (!options.yes) {
      const answers = await inquirer.prompt([
        {
          type: 'list',
          name: 'template',
          message: 'Select a template:',
          choices: [
            { name: 'Premium (with Auth + Dashboard)', value: 'basic' },
            { name: 'Minimal (no Auth)', value: 'minimal' }
          ],
          default: 'basic',
          when: !options.template
        },
        {
          type: 'list',
          name: 'packageManager',
          message: 'Select package manager:',
          choices: ['npm', 'yarn', 'pnpm'],
          default: 'npm',
          when: !options.packageManager
        },
        {
          type: 'confirm',
          name: 'git',
          message: 'Initialize git?',
          default: true,
          when: options.git === undefined
        },
        {
          type: 'confirm',
          name: 'install',
          message: 'Install dependencies?',
          default: true,
          when: options.install === undefined
        }
      ]);

      finalOptions = { ...finalOptions, ...answers };
    } else {
      // Defaults for --yes
      finalOptions = {
        template: options.template || 'basic',
        packageManager: options.packageManager || 'npm',
        git: options.git !== false,
        install: options.install !== false,
        ...options
      };
    }

    // 5. Scaffolding
    await generateProject({
      projectName: finalProjectName,
      projectPath,
      template: finalOptions.template,
      auth: finalOptions.template !== 'minimal'
    });

    // 6. Git Init
    if (finalOptions.git) {
      spinner.start(messages.GIT_INIT);
      await initGit(projectPath);
      spinner.succeed('Git repository initialized.');
    }

    // 7. Dependency Installation
    if (finalOptions.install) {
      spinner.info(messages.INSTALLING);
      await installDependencies(projectPath, finalOptions.packageManager);
    }

    // 8. Success Message
    logger.success(messages.SUCCESS(finalProjectName));
    logger.info(messages.NEXT_STEPS(finalProjectName));
    logger.dim('\nBuild something extraordinary with Developer-CLI-Tool! 🚀');
    logger.dim('Created by anointedthedeveloper — github.com/anointedthedeveloper');

  } catch (err) {
    throw err;
  }
};

module.exports = initCommand;
