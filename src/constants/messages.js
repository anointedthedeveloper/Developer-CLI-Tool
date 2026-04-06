const messages = {
  WELCOME: `
  🚀 Welcome to create-nexus-react-app
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
    npm start

  Or use:
    npm run dev

  Built with create-nexus-react-app by anointedthedeveloper
  ⭐ Star us: github.com/anointedthedeveloper/Developer-CLI-Tool
  `,
  ERROR_DIR_NOT_EMPTY: 'Directory is not empty. Use --force to overwrite.',
  ERROR_INVALID_NAME: (name) => `Invalid project name: ${name}`,
  SUCCESS_EMOJI: '✨',
  BANNER: `
  ███╗   ██╗███████╗██╗  ██╗██╗   ██╗███████╗
  ████╗  ██║██╔════╝╚██╗██╔╝██║   ██║██╔════╝
  ██╔██╗ ██║█████╗   ╚███╔╝ ██║   ██║███████╗
  ██║╚██╗██║██╔══╝   ██╔██╗ ██║   ██║╚════██║
  ██║ ╚████║███████╗██╔╝ ██╗╚██████╔╝███████║
  ╚═╝  ╚═══╝╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝

  create-nexus-react-app — by anointedthedeveloper
  `
};

module.exports = messages;
