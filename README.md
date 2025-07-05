# SpaceX Launch Dashboard

**Live Demo:** [https://interview-for-junaid-ahmed-syed.vercel.app/](https://interview-for-junaid-ahmed-syed.vercel.app/)

A modern React + TypeScript dashboard for exploring SpaceX launches, built with Vite and TailwindCSS.

## Features

- **Live SpaceX Data:** Fetches launches, rockets, payloads, and launchpads from the [SpaceX API v4](https://github.com/r-spacex/SpaceX-API).
- **Filter Launches:**  
  - By status: All, Upcoming, Past, Success, Failed  
- **Launch Details Modal:** Click any launch to view mission, rocket, payload, and site details in a modal.
- **Responsive UI:** Clean, responsive design with TailwindCSS.
- **Loading & Empty States:** Animated spinner while loading, and a friendly message if no results match your filters.
- **Type-safe:** Built with TypeScript throughout.

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/iamsjunaid/interview-for-junaid-ahmed-syed/
   cd interview-for-junaid-ahmed-syed
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser:**  
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Build for Production

```bash
npm run build
# or
yarn build
```

Preview the production build:
```bash
npm run preview
# or
yarn preview
```

### Linting

```bash
npm run lint
# or
yarn lint
```

## Project Structure

```
src/
  assets/           # Images and styles
  components/       # UI components (modals, filters, spinner, etc.)
  lib/              # API utilities for SpaceX data
  pages/            # Main Dashboard page
  types/            # TypeScript types for launches, rockets, etc.
public/             # Static assets
```

## API

This app uses the public [SpaceX API v4](https://github.com/r-spacex/SpaceX-API):

- Launches: `https://api.spacexdata.com/v4/launches`
- Rockets: `https://api.spacexdata.com/v4/rockets`
- Payloads: `https://api.spacexdata.com/v4/payloads`
- Launchpads: `https://api.spacexdata.com/v4/launchpads`

## Customization

- **TailwindCSS:**  
  See `tailwind.config.js` and use Tailwind utility classes in your components.
- **ESLint:**  
  Type-aware linting is enabled. See `eslint.config.js` for advanced configuration.

## Credits

- [SpaceX API](https://github.com/r-spacex/SpaceX-API)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [React](https://react.dev/)

---
