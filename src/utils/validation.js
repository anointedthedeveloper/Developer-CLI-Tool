const validatePackageName = require('validate-npm-package-name');
const fs = require('fs-extra');
const path = require('path');

/**
 * Validates project name for npm convention
 * @param {string} name 
 * @returns {boolean|string}
 */
const validateProjectName = (name) => {
  const result = validatePackageName(name);
  if (!result.validForNewPackages) {
    return `Invalid project name: ${(result.errors || result.warnings).join(', ')}`;
  }
  return true;
};

/**
 * Checks if directory is empty or if we can proceed
 * @param {string} projectPath 
 * @param {boolean} force 
 * @returns {Promise<boolean>}
 */
const isDirectoryEmpty = async (projectPath, force = false) => {
  if (!fs.existsSync(projectPath)) return true;

  const files = await fs.readdir(projectPath);
  if (files.length === 0) return true;

  if (force) {
    await fs.emptyDir(projectPath);
    return true;
  }

  return false;
};

module.exports = {
  validateProjectName,
  isDirectoryEmpty
};
