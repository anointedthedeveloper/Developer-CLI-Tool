const path = require('path');
const fs = require('fs-extra');
const cliProgress = require('cli-progress');
const chalk = require('chalk');
const { processTemplate } = require('./file-generator');

const formatTime = (ms) => {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
};

/**
 * Orchestrates project scaffolding
 * @param {object} config 
 */
const generateProject = async (config) => {
  const { projectName, projectPath, template, auth } = config;
  const templateBaseDir = path.join(__dirname, '../templates');

  const data = {
    projectName,
    auth: template !== 'minimal' && auth !== false,
  };

  const filesToProcess = [
    { src: 'base/package.json.ejs', dest: 'package.json' },
    { src: 'base/vite.config.ts.ejs', dest: 'vite.config.ts' },
    { src: 'base/tailwind.config.js.ejs', dest: 'tailwind.config.js' },
    { src: 'base/postcss.config.js.ejs', dest: 'postcss.config.js' },
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

  if (data.auth) {
    filesToProcess.push(
      { src: 'auth/AuthContext.tsx.ejs', dest: 'src/contexts/AuthContext.tsx' },
      { src: 'auth/ProtectedRoute.tsx.ejs', dest: 'src/routes/ProtectedRoute.tsx' },
      { src: 'auth/Login.tsx.ejs', dest: 'src/pages/login/index.tsx' },
      { src: 'auth/Dashboard.tsx.ejs', dest: 'src/pages/dashboard/index.tsx' }
    );
  }

  const dirsToCreate = [
    'src/assets', 'src/components/ui', 'src/components/layout',
    'src/components/forms', 'src/hooks', 'src/utils', 'src/types', 'public'
  ];

  const totalSteps = filesToProcess.length + dirsToCreate.length + 4; // +4 for env/gitignore writes
  const startTime = Date.now();

  const bar = new cliProgress.SingleBar({
    format: chalk.cyan(' Scaffolding') + ' |' + chalk.cyan('{bar}') + '| {percentage}%  {file}  ' +
      chalk.yellow('⏱ {spent}') + '  ' + chalk.dim('ETA {eta}'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    etaBuffer: 5,
    fps: 15,
  }, cliProgress.Presets.shades_classic);

  bar.start(totalSteps, 0, { file: '', spent: '0s', eta: '?' });

  const tick = (label) => {
    const spent = formatTime(Date.now() - startTime);
    bar.increment(1, { file: chalk.dim(label), spent });
  };

  for (const file of filesToProcess) {
    const srcPath = path.join(templateBaseDir, file.src);
    const destPath = path.join(projectPath, file.dest);
    await processTemplate(srcPath, destPath, data);
    tick(file.dest);
  }

  for (const dir of dirsToCreate) {
    await fs.ensureDir(path.join(projectPath, dir));
    tick(dir + '/');
  }

  const envContent = 'VITE_API_URL=http://localhost:3000/api\n';
  await fs.writeFile(path.join(projectPath, '.env.example'), envContent); tick('.env.example');
  await fs.writeFile(path.join(projectPath, '.env.development'), envContent); tick('.env.development');
  await fs.writeFile(path.join(projectPath, '.env.production'), envContent); tick('.env.production');

  const gitignore = `node_modules\ndist\n.env\n.env.local\n.env.development.local\n.env.test.local\n.env.production.local\nnpm-debug.log*\nyarn-debug.log*\nyarn-error.log*\n.DS_Store`;
  await fs.writeFile(path.join(projectPath, '.gitignore'), gitignore); tick('.gitignore');

  bar.stop();

  const totalTime = formatTime(Date.now() - startTime);
  console.log(chalk.green(`\n ✔ Project files scaffolded in ${totalTime}\n`));
};

module.exports = {
  generateProject
};
