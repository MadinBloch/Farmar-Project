# Haasil

A transparent marketplace that helps farmers find the best buyer for their produce by calculating **expected net realisation** — what actually reaches their pocket — instead of just showing raw market prices.

## Prerequisites

- [Node.js](https://nodejs.org/) **v18 or newer** (v20 recommended)
- **npm** (comes with Node.js)

Check your versions:

```bash
node -v
npm -v
```

## Setup

1. **Clone or open the project**

   ```bash
   cd FarmerProject
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**

   Visit the URL Vite prints in the terminal (usually [http://localhost:5173](http://localhost:5173)).

## Other commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start local development server with hot reload |
| `npm run build` | Build production assets into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```
FarmerProject/
├── public/          # Static assets (favicon)
├── src/
│   ├── App.jsx      # Landing page
│   ├── index.css    # Styles
│   └── main.jsx     # React entry
├── index.html
├── package.json
└── vite.config.js
```
