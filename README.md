# DM Toolkit - D&D Campaign Manager

[![CI](https://github.com/mittonface/claude-go-wild/actions/workflows/ci.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/ci.yml)
[![CodeQL](https://github.com/mittonface/claude-go-wild/actions/workflows/codeql.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/codeql.yml)
[![Lighthouse Performance](https://github.com/mittonface/claude-go-wild/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/lighthouse.yml)
[![Release](https://github.com/mittonface/claude-go-wild/actions/workflows/release.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/release.yml)
[![Dependency Updates](https://github.com/mittonface/claude-go-wild/actions/workflows/dependency-update.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/dependency-update.yml)

A comprehensive web application designed to help Dungeon Masters manage their D&D campaigns, NPCs, encounters, and more.

## 🤖 About This Project

This entire application was built as an experiment with [Claude Code](https://claude.ai/code), Anthropic's AI-powered development environment. Every line of code, feature implementation, test, and infrastructure setup was generated through conversations with Claude Code. This project serves as a practical demonstration of AI-assisted software development, showcasing how modern AI can handle full-stack development tasks from initial setup through deployment and maintenance.

## 🛡️ Security & Quality Status

| Pipeline | Status | Description |
|----------|--------|-------------|
| **Continuous Integration** | [![CI](https://github.com/mittonface/claude-go-wild/actions/workflows/ci.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/ci.yml) | Automated testing, linting, and building |
| **CodeQL Security Analysis** | [![CodeQL](https://github.com/mittonface/claude-go-wild/actions/workflows/codeql.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/codeql.yml) | Automated security vulnerability scanning |
| **Lighthouse Performance** | [![Lighthouse](https://github.com/mittonface/claude-go-wild/actions/workflows/lighthouse.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/lighthouse.yml) | Web performance, accessibility & SEO audits |
| **Automated Releases** | [![Release](https://github.com/mittonface/claude-go-wild/actions/workflows/release.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/release.yml) | Semantic versioning and automated releases |
| **Dependency Updates** | [![Dependabot](https://github.com/mittonface/claude-go-wild/actions/workflows/dependency-update.yml/badge.svg)](https://github.com/mittonface/claude-go-wild/actions/workflows/dependency-update.yml) | Automated dependency security updates |

### 📊 Quality Metrics
- **Test Coverage**: Comprehensive unit and integration tests
- **Performance**: Lighthouse audits on every PR  
- **Security**: CodeQL analysis and Dependabot monitoring
- **Code Quality**: ESLint, TypeScript strict mode, and automated formatting

## Features

### 🎯 Campaign Management
- Create and manage multiple campaigns
- Track sessions with detailed notes
- Associate NPCs and encounters with specific campaigns
- Edit campaign details and descriptions

### 🧙 NPC Generator
- Generate random NPCs with names, races, and traits
- Customizable gender and level selection
- Auto-generated stat blocks following D&D rules
- Save generated NPCs to your campaigns

### 🎲 Dice Roller
- Support for all standard dice formulas (e.g., 1d20+5, 2d6, etc.)
- Advantage and disadvantage rolling
- Roll history tracking
- Quick-access buttons for common rolls

### ⚔️ Encounter Builder (Coming Soon)
- Calculate encounter difficulty based on party size and level
- Initiative tracker for combat management
- CR calculator following DMG guidelines

### 📝 Session Notes (Coming Soon)
- Markdown support for rich text formatting
- Organized by campaign and date
- Quick search functionality

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Testing**: Jest, React Testing Library
- **Deployment**: Docker, Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Docker (optional, for containerized deployment)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd claude-go-wild
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma generate
npx prisma db push
```

4. Create a `.env` file:
```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Docker Deployment

1. Build and run with Docker Compose:
```bash
docker-compose up --build
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test
```

## 🔒 Security & Performance Monitoring

### Security Analysis
- **CodeQL**: Automated vulnerability scanning on every commit
- **Dependabot**: Automated dependency updates and security patches
- **SARIF Reports**: Detailed security analysis in the Security tab
- **Security Policy**: See [SECURITY.md](./SECURITY.md) for vulnerability reporting

### Performance Monitoring  
- **Lighthouse CI**: Performance audits on every PR
- **Performance Budgets**: Enforced minimum scores (80% performance, 60% accessibility)
- **Web Vitals**: Core Web Vitals tracking and optimization
- **Multi-page Analysis**: Home, Dice, NPCs, and Encounters pages tested

### Quality Assurance
- **Continuous Integration**: Automated testing and building
- **Code Quality**: ESLint, TypeScript strict mode
- **Test Coverage**: Comprehensive unit and integration tests
- **Automated Releases**: Semantic versioning with changelogs

## Development

### Project Structure

```
claude-go-wild/
├── app/                  # Next.js app directory
│   ├── api/             # API routes
│   ├── campaigns/       # Campaign pages
│   ├── dice/           # Dice roller page
│   ├── npcs/           # NPC pages
│   └── ...
├── components/          # Reusable React components
├── lib/                # Utility functions and libraries
│   ├── db.ts           # Database client
│   ├── dice.ts         # Dice rolling logic
│   ├── encounter.ts    # Encounter calculations
│   └── generators.ts   # NPC generators
├── prisma/             # Database schema
├── types/              # TypeScript type definitions
└── public/             # Static assets
```

### API Endpoints

- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create a new campaign
- `GET /api/campaigns/[id]` - Get campaign details
- `PATCH /api/campaigns/[id]` - Update campaign
- `DELETE /api/campaigns/[id]` - Delete campaign
- `GET /api/npcs` - List NPCs (with optional campaign filter)
- `POST /api/npcs` - Create an NPC
- `POST /api/npcs/generate` - Generate random NPC
- `GET /api/dice` - Get dice roll history
- `POST /api/dice` - Roll dice

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgments

- D&D 5e rules and mechanics by Wizards of the Coast
- Built with Next.js and React
- Styled with Tailwind CSS