const ejs = require('ejs');
const fs = require('fs-extra');
const path = require('path');

/**
 * Processes a template file and writes it to destination
 * @param {string} templatePath 
 * @param {string} destinationPath 
 * @param {object} data 
 */
const processTemplate = async (templatePath, destinationPath, data) => {
  try {
    const templateContent = await fs.readFile(templatePath, 'utf8');
    const processedContent = ejs.render(templateContent, data);
    
    // Ensure destination directory exists
    await fs.ensureDir(path.dirname(destinationPath));
    await fs.writeFile(destinationPath, processedContent);
  } catch (err) {
    throw new Error(`Failed to process template ${templatePath}: ${err.message}`);
  }
};

/**
 * Copies a file or directory
 * @param {string} src 
 * @param {string} dest 
 */
const copyFile = async (src, dest) => {
  await fs.copy(src, dest);
};

module.exports = {
  processTemplate,
  copyFile
};
