const messages = {
  WELCOME: `
  🚀 Welcome to Developer-CLI-Tool
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

  Built with Developer-CLI-Tool by anointedthedeveloper
  ⭐ Star us: github.com/anointedthedeveloper/Developer-CLI-Tool
  `,
  ERROR_DIR_NOT_EMPTY: 'Directory is not empty. Use --force to overwrite.',
  ERROR_INVALID_NAME: (name) => `Invalid project name: ${name}`,
  SUCCESS_EMOJI: '✨',
  BANNER: `
  _____                 _                                
 |  __ \\               | |                               
 | |  | | _____   _____| | ___  _ __   ___ _ __          
 | |  | |/ _ \\ \\ / / _ \\ |/ _ \\| '_ \\ / _ \\ '__|         
 | |__| |  __/\\ V /  __/ | (_) | |_) |  __/ |            
 |_____/ \\___| \\_/ \\___|_|\\___/| .__/ \\___|_|            
                               | |                       
  D E V E L O P E R   C L I    |_| T O O L              
  by anointedthedeveloper
  `
};

module.exports = messages;
