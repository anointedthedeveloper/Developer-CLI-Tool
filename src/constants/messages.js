const messages = {
  WELCOME: `
  🚀 Welcome to create-nexusapp
  The ultimate React + Tailwind + Auth starter kit.
  Created by anointedthedeveloper — github.com/anointedthedeveloper
  `,
  VALIDATING: 'Validating project name and directory...',
  SCAFFOLDING: 'Scaffolding project files...',
  INSTALLING: 'Installing dependencies... (this may take a minute)',
  GIT_INIT: 'Initializing git repository...',
  SUCCESS: (projectName) => `Project ${projectName} created successfully!`,
  NEXT_STEPS: (projectName) => `
  Next steps:
    cd ${projectName}
    npm run dev

  Built with create-nexusapp by anointedthedeveloper
  ⭐ Star us: github.com/anointedthedeveloper/Developer-CLI-Tool
  `,
  ERROR_DIR_NOT_EMPTY: 'Directory is not empty. Use --force to overwrite.',
  ERROR_INVALID_NAME: (name) => `Invalid project name: ${name}`,
  SUCCESS_EMOJI: '✨',
  BANNER: `
   _   _  _______  _______  _     _  _______
  | \ | ||  _____||  _____|| |   | ||  _____|
  |  \| || |___   | |___   | |   | || |___
  | . ' ||  ___|  |  ___|  | |   | ||  ___|
  | |\  || |_____ | |_____ | |___| || |_____
  |_| \_||_______||_______||_______||_______|

  C R E A T E  N E X U S A P P
  by anointedthedeveloper
  `
};

module.exports = messages;
