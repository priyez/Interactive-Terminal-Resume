# 🖥️ Interactive Terminal Resume

A unique, terminal-style interactive resume built with Next.js, TypeScript, and Tailwind CSS. Experience a professional portfolio through a command-line interface!

![Terminal Resume](https://img.shields.io/badge/Next.js-16.1.6-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### 🎯 Core Functionality
- **Interactive Terminal Interface** - Type commands to explore resume content
- **Command Parser** - Advanced argument and flag parsing (e.g., `theme --color dark`)
- **Plugin Architecture** - Modular, extensible command system
- **Command History** - Navigate with ↑/↓ arrows, persists across sessions
- **Auto-Complete** - Tab completion and real-time suggestions
- **Command Aliases** - Shortcuts like `exp` for `experience`, `ls` for `help`

### 🎨 Visual Polish
- **Custom Blinking Cursor** - Authentic terminal-style cursor
- **Syntax Highlighting** - Color-coded headers, bullets, links, and emojis
- **Smooth Animations** - Fade-in effects and theme transitions
- **Multiple Themes** - Dark, Light, and Hacker themes
- **ASCII Art Banner** - Custom name banner on load

### ♿ Accessibility
- **Screen Reader Support** - Full ARIA labels and live regions
- **Keyboard Navigation** - Complete keyboard control
- **WCAG 2.1 Compliant** - Accessible to all users
- **Keyboard Shortcuts**:
  - `Ctrl+C` - Clear input
  - `Ctrl+L` - Clear terminal
  - `↑/↓` - Navigate history
  - `Tab` - Auto-complete

### 🎮 Easter Eggs
- `whoami` - Identity reveal
- `sudo` - Humorous permission denial
- `hack` - Fake hacking sequence
- `matrix` - Matrix movie references

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/priyez/Interactive-Terminal-Resume.git

# Navigate to project
cd Interactive-Terminal-Resume

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the terminal resume.

## 📝 Available Commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `help` | `ls`, `dir` | Show all available commands |
| `summary` | `about` | Professional summary |
| `skills` | `sk` | Technical skills |
| `experience` | `exp` | Work experience |
| `education` | `edu` | Education information |
| `contact` | `info` | Contact details |
| `social` | - | Social media links |
| `download` | - | Download resume |
| `theme [color]` | - | Change theme (dark/light/hacker) |
| `clear` | `clr` | Clear terminal |

### Advanced Usage

```bash
# Filter experience by company
experience --company BlessedLouis

# Change theme with flag
theme --color hacker
```

## 🏗️ Project Structure

```
Interactive-Terminal-Resume/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main page component
│   │   ├── layout.tsx         # Root layout
│   │   └── globals.css        # Global styles & animations
│   ├── components/
│   │   ├── Terminal.tsx       # Main terminal component
│   │   ├── CommandOutput.tsx  # Output with syntax highlighting
│   │   ├── CommandSuggestions.tsx
│   │   ├── Preloader.tsx
│   │   └── ErrorBoundary.tsx  # Error handling
│   ├── hooks/
│   │   ├── useTerminal.ts     # Terminal state & logic
│   │   └── useLocation.ts     # Geolocation hook
│   ├── lib/
│   │   ├── commandParser.ts   # Command parsing utility
│   │   ├── commandPlugin.ts   # Plugin architecture
│   │   └── themes.ts          # Theme definitions
│   └── data/
│       ├── resume.ts          # Resume content
│       └── commandPlugins.ts  # Command implementations
├── package.json
└── README.md
```

## 🎨 Customization

### Update Resume Content

Edit `src/data/resume.ts` to customize:
- Personal information
- Skills and experience
- Social links
- Command outputs

### Add New Commands

1. Create a new plugin in `src/data/commandPlugins.ts`:

```typescript
export const myCommandPlugin: CommandPlugin = {
  name: "mycommand",
  aliases: ["mc"],
  description: "My custom command",
  execute: (parsed, context) => {
    return "Command output";
  },
};
```

2. Register it in `src/hooks/useTerminal.ts`:

```typescript
commandRegistry.register(myCommandPlugin);
```

### Customize Themes

Edit `src/lib/themes.ts` to add or modify themes:

```typescript
export const THEMES: Record<ThemeType, string> = {
  dark: "bg-gray-900 text-gray-200",
  light: "bg-[#f7f7f7] text-gray-500",
  hacker: "bg-black text-green-400",
  // Add your theme here
};
```

## 🛠️ Tech Stack

- **Framework**: Next.js 16.1.6
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **State Management**: React Hooks
- **Storage**: localStorage (command history)

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/priyez/Interactive-Terminal-Resume)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sopiriye Jamabo**
- Portfolio: [sopiriye.xyz](https://sopiriye.xyz)
- GitHub: [@priyez](https://github.com/priyez)
- LinkedIn: [sopiriye-jamabo](https://linkedin.com/in/sopiriye-jamabo)
- Email: sopiriyejamabo@gmail.com

## 🙏 Acknowledgments

- Inspired by classic terminal interfaces
- Built with modern web technologies
- Designed for accessibility and user experience

---

⭐ Star this repo if you find it useful!
