# Faisal's Portfolio

A warm, personal portfolio website built with **React 18 + Vite + Tailwind CSS**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open http://localhost:5173
```

---

## 📁 Project Structure

```
portfolio/
├── public/
│   └── profile.jpg          ← PUT YOUR PHOTO HERE
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        Navigation bar
│   │   ├── Hero.jsx          Hero / landing section
│   │   ├── About.jsx         About me + interests
│   │   ├── Experience.jsx    Work history (timeline)
│   │   ├── Projects.jsx      Project cards grid
│   │   ├── Skills.jsx        Skill tag clouds
│   │   ├── Education.jsx     Education cards
│   │   ├── Contact.jsx       Contact form + links
│   │   ├── Footer.jsx        Footer
│   │   ├── AdminBar.jsx      Floating admin status bar
│   │   ├── AdminLoginModal.jsx  Password modal
│   │   └── AdminUI.jsx       Shared admin edit UI components
│   ├── context/
│   │   └── PortfolioContext.jsx  Global state + admin mode
│   ├── data/
│   │   └── portfolioData.js  ← ALL YOUR CONTENT LIVES HERE
│   ├── hooks/
│   │   └── useReveal.js      Scroll-triggered animation hook
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .github/workflows/
│   └── deploy.yml            Auto-deploy to GitHub Pages
├── vite.config.js
├── tailwind.config.js
└── package.json
```

---

## 🖼️ Adding Your Photo

1. Save your photo as `profile.jpg` (or `.png`)
2. Drop it into the `/public/` folder
3. The image path in `portfolioData.js` is `/profile.jpg` by default — update if different

---

## ✏️ Editing Content

### Option A — Edit the data file directly (recommended)

Open `src/data/portfolioData.js` and update any field. This is the single source of truth for all your content: name, bio, projects, skills, experience, education, interests.

### Option B — Admin Mode (in-browser editing)

1. Open your portfolio in the browser
2. Click the ⚙️ icon in the top-right of the navbar
3. Enter the admin password (`faisal2024` by default — change it in `PortfolioContext.jsx`)
4. A floating green bar appears at the bottom — you're in admin mode!
5. Every section now shows an **Edit** button — click to open a form and update content live
6. Changes are saved to `localStorage` and persist across page reloads
7. Click **Reset** in the admin bar to restore original CV data at any time

**To change the admin password**, open `src/context/PortfolioContext.jsx` and find:
```js
const ADMIN_PASSWORD = 'faisal2024'; // Change this!
```

---

## 🎨 Customising the Design

### Colours
All colours are defined as Tailwind custom tokens in `tailwind.config.js`:

| Token | Value | Usage |
|-------|-------|-------|
| `cream` | `#faf6ef` | Page background |
| `sand` | `#e8ddd0` | Borders, subtle bg |
| `terra` | `#c0624a` | Primary accent (terracotta) |
| `bark` | `#5c3d2e` | Dark text, headings |
| `bark-light` | `#8a6252` | Body text |
| `bark-muted` | `#9e8a7e` | Subtle text |

### Fonts
- **Headings**: Lora (serif, Google Fonts)
- **Body**: DM Sans (sans-serif, Google Fonts)

Change in `index.html` (the Google Fonts link) and `tailwind.config.js`.

### Status Badge
Update `personal.status` in `portfolioData.js`:
- `"available"` → green badge "Available for work"
- `"working"` → amber badge "Currently employed"
- `"open"` → blue badge "Open to opportunities"

---

## 🚢 Deploy to GitHub Pages

### Step 1 — Update the base path
In `vite.config.js`, change `base` to match your repo name:
```js
base: '/your-repo-name/',
```

### Step 2 — Push to GitHub
```bash
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/faisalaazhar/your-repo-name.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages
1. Go to your repo on GitHub
2. Settings → Pages
3. Source: **GitHub Actions**
4. The workflow in `.github/workflows/deploy.yml` will automatically build and deploy on every push to `main`

Your portfolio will be live at: `https://faisalaazhar.github.io/your-repo-name/`

---

## 🧩 Design Techniques Used

Here's a breakdown of every design decision so you can learn and adapt them:

### 1. Warm Colour Palette
All colours are earth tones (cream, sand, terracotta, bark). Defined as CSS custom properties via Tailwind config — change one value and it updates everywhere.

### 2. Grain Texture Overlay
In `index.css`, `body::before` applies a fixed SVG-based noise texture with low opacity. This gives a tactile, premium feel over flat colours.

### 3. Scroll-Triggered Reveal Animations
`useReveal.js` uses `IntersectionObserver` to add a `visible` class when an element enters the viewport. Combined with the `.reveal` CSS class (opacity: 0 → 1, translateY: 24px → 0), this gives smooth entrance animations without any library.

### 4. Radial Background Glows
Large, blurred `div` elements with `rounded-full`, low-opacity colours, and `blur-3xl` create ambient background light. Completely CSS — no images.

### 5. Decorative Rotated Card (Hero)
The photo frame uses two overlapping `div`s — one rotated 3° with a gradient background, one straight with the actual content. Creates depth from plain HTML.

### 6. Dot Grid Decoration
A CSS grid of 16 tiny `span` elements with `rounded-full` and varying opacity creates the dot pattern in the hero — no SVG needed.

### 7. Skill Tags (No Bars)
Skills are rendered as pill-shaped tags with hover states. This is more honest than percentage bars (which are often arbitrary) and looks cleaner.

### 8. Timeline Layout (Experience)
A flex column with a dot + vertical line creates the timeline. The dot uses `ring-4` for the halo effect. Pure CSS, no library.

### 9. Admin Mode Architecture
- `PortfolioContext.jsx` holds all data in React state + `localStorage`
- `adminMode` boolean is toggled by password
- Each section reads `adminMode` and conditionally renders edit buttons
- Edits update context → auto-saves to localStorage → survives page refresh

### 10. Staggered Entrance (Hero)
The hero uses `animate-fadeUp` (a custom Tailwind keyframe) with `animation-delay` to stagger child elements — gives a polished, orchestrated feel on first load.

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `react` + `react-dom` | UI framework |
| `vite` + `@vitejs/plugin-react` | Build tool |
| `tailwindcss` | Utility CSS |
| `lucide-react` | Icon library |
| `autoprefixer` + `postcss` | CSS processing |

---

*Built with ❤️ by Md Faisal Ahmed Ridoy*
