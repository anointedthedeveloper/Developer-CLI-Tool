const execa = require('execa');

/**
 * Installs dependencies using specified package manager
 * @param {string} projectPath 
 * @param {string} packageManager 
 * @returns {Promise<void>}
 */
const installDependencies = async (projectPath, packageManager) => {
  const args = packageManager === 'yarn' ? [] : ['install'];
  
  try {
    await execa(packageManager, args, {
      cwd: projectPath,
      stdio: 'inherit'
    });
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
