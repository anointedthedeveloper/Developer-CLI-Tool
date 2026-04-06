const execa = require('execa');
const chalk = require('chalk');
const cliProgress = require('cli-progress');
const fs = require('fs-extra');
const path = require('path');

// Average size per package in MB (rough estimate)
const AVG_PKG_MB = 0.5;

const formatTime = (ms) => ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`;
const formatMB = (mb) => mb < 1 ? `${(mb * 1024).toFixed(0)}KB` : `${mb.toFixed(1)}MB`;

const countExpectedPackages = (projectPath) => {
  try {
    const pkg = fs.readJsonSync(path.join(projectPath, 'package.json'));
    const deps = Object.keys(pkg.dependencies || {}).length;
    const devDeps = Object.keys(pkg.devDependencies || {}).length;
    // Multiply by ~4 to account for transitive dependencies
    return (deps + devDeps) * 4;
  } catch {
    return 80;
  }
};

const installDependencies = async (projectPath, packageManager) => {
  const total = countExpectedPackages(projectPath);
  const totalMB = total * AVG_PKG_MB;
  const start = Date.now();
  let installed = 0;

  const bar = new cliProgress.SingleBar({
    format:
      chalk.cyan(' Installing') + ' |' + chalk.cyan('{bar}') + '| {percentage}%  ' +
      chalk.magenta('{installed}/{total} pkgs') + '  ' +
      chalk.blue('{mb}/' + formatMB(totalMB)) + '  ' +
      chalk.yellow('⏱ {spent}') + '  ' + chalk.dim('ETA {eta}'),
    barCompleteChar: '█',
    barIncompleteChar: '░',
    hideCursor: true,
    fps: 10,
  }, cliProgress.Presets.shades_classic);

  bar.start(total, 0, { installed: 0, total, mb: '0KB', spent: '0s' });

  // npm flags: verbose gives us one line per package resolved
  const FLAGS = {
    npm:  ['install', '--prefer-offline', '--no-audit', '--no-fund', '--loglevel=verbose'],
    yarn: ['--prefer-offline', '--non-interactive'],
    pnpm: ['install', '--prefer-offline'],
  };

  // Patterns that indicate a package was processed
  const PKG_PATTERNS = {
    npm:  /npm http fetch GET|added \d+ package|reify:|extract:/i,
    yarn: /^(info|success|\[\d+\/\d+\])/,
    pnpm: /^Packages\s|downloading|\d+\/\d+/,
  };

  const args = FLAGS[packageManager] ?? ['install'];
  const pattern = PKG_PATTERNS[packageManager];

  try {
    const proc = execa(packageManager, args, { cwd: projectPath, all: true });

    proc.all.on('data', (chunk) => {
      const lines = chunk.toString().split('\n');
      for (const line of lines) {
        if (pattern.test(line) && installed < total) {
          installed++;
          const spent = formatTime(Date.now() - start);
          const mb = formatMB((installed / total) * totalMB);
          bar.update(installed, { installed, total, mb, spent });
        }
      }
    });

    await proc;

    bar.update(total, {
      installed: total,
      mb: formatMB(totalMB),
      spent: formatTime(Date.now() - start),
    });
    bar.stop();

    const elapsed = formatTime(Date.now() - start);
    console.log(chalk.green(`\n ✔ ${total} packages installed (${formatMB(totalMB)}) in ${elapsed}\n`));
  } catch (err) {
    bar.stop();
    throw new Error(`Failed to install dependencies with ${packageManager}: ${err.message}`);
  }
};

const initGit = async (projectPath) => {
  try {
    await execa('git', ['init'], { cwd: projectPath });
    await execa('git', ['add', '.'], { cwd: projectPath });
    await execa('git', ['commit', '-m', 'Initial commit from create-nexus'], { cwd: projectPath });
  } catch {
    console.warn('\n⚠ Failed to initialize git repository.');
  }
};

module.exports = {
  installDependencies,
  initGit
};
