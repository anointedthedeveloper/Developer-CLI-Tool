const execa = require('execa');
const chalk = require('chalk');

const SPEED_FLAGS = {
  npm:  ['install', '--prefer-offline', '--no-audit', '--no-fund', '--loglevel=error'],
  yarn: ['--prefer-offline', '--no-progress'],
  pnpm: ['install', '--prefer-offline', '--reporter=silent'],
};

/**
 * Installs dependencies using specified package manager
 * @param {string} projectPath 
 * @param {string} packageManager 
 * @returns {Promise<void>}
 */
const installDependencies = async (projectPath, packageManager) => {
  const args = SPEED_FLAGS[packageManager] ?? ['install'];
  const start = Date.now();

  try {
    await execa(packageManager, args, { cwd: projectPath, stdio: 'inherit' });
    const elapsed = ((Date.now() - start) / 1000).toFixed(1);
    console.log(chalk.green(`\n ✔ Dependencies installed in ${elapsed}s\n`));
  } catch (err) {
    throw new Error(`Failed to install dependencies with ${packageManager}: ${err.message}`);
  }
};

/**
 * Initializes a git repository
 * @param {string} projectPath 
 */
const initGit = async (projectPath) => {
  try {
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit from Developer-CLI-Tool'], { cwd: projectPath });
  } catch (err) {
    // Non-fatal error
    console.warn('\n⚠ Failed to initialize git repository.');
  }
};

module.exports = {
  installDependencies,
  initGit
};
