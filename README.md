# create-nexus-app 🚀

[![npm version](https://img.shields.io/npm/v/create-nexus-app.svg)](https://www.npmjs.com/package/create-nexus-app)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Author](https://img.shields.io/badge/author-anointedthedeveloper-blue.svg)](https://github.com/anointedthedeveloper)

**Production-grade, developer-first CLI tool for bootstrapping React applications with zero configuration fatigue.**

> Designed and built by [**anointedthedeveloper**](https://github.com/anointedthedeveloper)

## The Problem
Setting up a modern React project with authentication, routing, and styling requires 30+ minutes of configuration. Every project needs the same setup. This CLI eliminates that setup time by providing a premium, opinionated starter kit.

## Features ✨
- ⚡️ **Vite**: Lightning-fast builds and HMR
- 🎨 **TailwindCSS**: Pre-configured with a custom brand palette
- 🛣️ **React Router 6**: Data routers pattern with protected routes
- 🔐 **Authentication**: Context-based auth with JWT-ready architecture
- 📁 **Modular Structure**: Industry-standard folder organization
- 🧹 **ESLint + Prettier**: Opinionated but extendable linting and formatting
- 🌍 **Environment Management**: Ready for development and production
- 🚀 **Production-Ready**: Axios interceptors and error boundaries included

## Quick Start 🏁

```bash
npx create-nexus-app my-app
# or
npm create nexus-app my-app
```

### Local Development (Source Code)

```bash
npm link
create-nexus-app my-app
```

## Advanced Usage 🛠️

```bash
# Minimal template (no auth)
create-nexus-app my-app --template minimal

# Skip prompts and use all defaults
create-nexus-app my-app --yes

# Specify package manager
create-nexus-app my-app --package-manager pnpm

# Force overwrite of existing directory
create-nexus-app my-app --force
```

## What's Inside? 📦

The generated project follows a clean, modular structure:

```text
my-app/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images, icons, etc.
│   ├── components/
│   │   ├── ui/          # Reusable UI components
│   │   ├── layout/      # Header, Sidebar, Footer
│   │   └── forms/       # Context-specific forms
│   ├── contexts/        # React Contexts (Auth, Theme, etc.)
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── services/        # API services (Axios instance)
│   ├── routes/          # Router configuration
│   ├── types/           # TypeScript interfaces/types
│   ├── App.tsx          # Main App component
│   └── main.tsx         # Entry point
├── .env.example         # Environment variable templates
├── tailwind.config.js   # Tailwind configuration
└── vite.config.ts       # Vite configuration
```

## Configuration Options ⚙️

| Flag | Description | Default |
|------|-------------|---------|
| `-t, --template` | Template to use (`basic`, `minimal`) | `basic` |
| `-p, --package-manager` | `npm`, `yarn`, or `pnpm` | `npm` |
| `-y, --yes` | Skip interactive prompts | `false` |
| `-g, --git` | Initialize git repository | `true` |
| `-i, --install` | Auto-install dependencies | `true` |
| `-f, --force` | Overwrite existing directory | `false` |

## Roadmap 🗺️
- [ ] Next.js template option
- [ ] TypeScript/JavaScript toggle
- [ ] Storybook integration
- [ ] Docker development environment
- [ ] CI/CD pipeline templates (GitHub Actions)

## Author 👤

Created and maintained by [**anointedthedeveloper**](https://github.com/anointedthedeveloper).

If this tool saved you time, consider giving it a ⭐ on [GitHub](https://github.com/anointedthedeveloper/Developer-CLI-Tool) — it means a lot!

## Contributing 🤝
Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License 📄
MIT © [anointedthedeveloper](https://github.com/anointedthedeveloper)

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/anointedthedeveloper"><strong>anointedthedeveloper</strong></a><br/>
  <sub>If you find this useful, a ⭐ on GitHub goes a long way 🙏</sub>
</p>
