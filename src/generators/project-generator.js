const path = require('path');
const fs = require('fs-extra');
const { processTemplate } = require('./file-generator');
const spinner = require('../utils/spinner');
const messages = require('../constants/messages');

/**
 * Orchestrates project scaffolding
 * @param {object} config 
 */
const generateProject = async (config) => {
  const { projectName, projectPath, template, auth } = config;
  const templateBaseDir = path.join(__dirname, '../templates');
  
  spinner.start(messages.SCAFFOLDING);

  // Template data for EJS
  const data = {
    projectName,
    auth: template !== 'minimal' && auth !== false,
  };

  // Files to process (always included)
  const filesToProcess = [
    { src: 'base/package.json.ejs', dest: 'package.json' },
    { src: 'base/vite.config.ts.ejs', dest: 'vite.config.ts' },
    { src: 'base/tailwind.config.js.ejs', dest: 'tailwind.config.js' },
    { src: 'base/tsconfig.json.ejs', dest: 'tsconfig.json' },
    { src: 'base/tsconfig.node.json.ejs', dest: 'tsconfig.node.json' },
    { src: 'base/eslintrc.cjs.ejs', dest: '.eslintrc.cjs' },
    { src: 'base/prettierrc.ejs', dest: '.prettierrc' },
    { src: 'base/index.html.ejs', dest: 'index.html' },
    { src: 'base/index.css.ejs', dest: 'src/index.css' },
    { src: 'base/main.tsx.ejs', dest: 'src/main.tsx' },
    { src: 'base/App.tsx.ejs', dest: 'src/App.tsx' },
    { src: 'base/routes.index.tsx.ejs', dest: 'src/routes/index.tsx' },
    { src: 'base/Home.tsx.ejs', dest: 'src/pages/home/index.tsx' },
    { src: 'base/api.ts.ejs', dest: 'src/services/api.ts' },
  ];

  // Optional: Add auth-related files
  if (data.auth) {
    filesToProcess.push(
      { src: 'auth/AuthContext.tsx.ejs', dest: 'src/contexts/AuthContext.tsx' },
      { src: 'auth/ProtectedRoute.tsx.ejs', dest: 'src/routes/ProtectedRoute.tsx' },
      { src: 'auth/Login.tsx.ejs', dest: 'src/pages/login/index.tsx' },
      { src: 'auth/Dashboard.tsx.ejs', dest: 'src/pages/dashboard/index.tsx' }
    );
  }

  // Scaffold the project
  for (const file of filesToProcess) {
    const srcPath = path.join(templateBaseDir, file.src);
    const destPath = path.join(projectPath, file.dest);
    await processTemplate(srcPath, destPath, data);
  }

  // Create empty directories
  const dirsToCreate = [
    'src/assets',
    'src/components/ui',
    'src/components/layout',
    'src/components/forms',
    'src/hooks',
    'src/utils',
    'src/types',
    'public'
  ];

  for (const dir of dirsToCreate) {
    await fs.ensureDir(path.join(projectPath, dir));
  }

  // Add .env files
  const envContent = 'VITE_API_URL=http://localhost:3000/api\n';
  await fs.writeFile(path.join(projectPath, '.env.example'), envContent);
  await fs.writeFile(path.join(projectPath, '.env.development'), envContent);
  await fs.writeFile(path.join(projectPath, '.env.production'), envContent);

  // Add .gitignore
  const gitignore = `
node_modules
dist
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.DS_Store
`;
  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore.trim());

  spinner.succeed('Project files scaffolded successfully.');
};

module.exports = {
  generateProject
};
