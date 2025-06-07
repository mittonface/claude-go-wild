# DM Toolkit - D&D Campaign Manager

A comprehensive web application designed to help Dungeon Masters manage their D&D campaigns, NPCs, encounters, and more.

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
cd dm-toolkit/dm-toolkit
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

## Development

### Project Structure

```
dm-toolkit/
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