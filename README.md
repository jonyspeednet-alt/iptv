# StreamVault TV

Modern IPTV Player with professional dark theme. Watch live TV channels from Bangladesh, India, Sports, Music, and more.

## Features

- **Modern UI/UX**: Professional teal/cyan theme with glass-morphism effects
- **48 Live Channels**: Bangla News, Bangla TV, Indian, Sports, Music, International, Kids, Religious
- **M3U Import**: Load your own M3U/M3U8 playlist files
- **Picture-in-Picture (PiP)**: Watch while browsing other apps
- **Dark/Light Theme**: Toggle between themes
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Keyboard Shortcuts**: Full keyboard navigation support
- **HLS Streaming**: Supports .m3u8 live streams via HLS.js with auto error recovery
- **PWA Ready**: Install on mobile as a standalone app
- **Favorites**: Save your favorite channels for quick access
- **Search & Filter**: Find channels by name or category
- **Auto-play**: Remembers your last channel, volume, and favorites

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| M | Mute/Unmute |
| F | Toggle Fullscreen |
| P | Previous Channel |
| N | Next Channel |
| R | Retry Stream |
| S | Statistics |
| H or ? | Show Help |
| Up/Down | Volume Up/Down |
| Left/Right | Seek -10s/+10s |
| Escape | Close sidebar |

## Tech Stack

- Next.js 16 + TypeScript
- Tailwind CSS 4
- HLS.js for streaming
- shadcn/ui components
- Static export for GitHub Pages

## Deploy to GitHub Pages

1. Fork or push this repo to GitHub
2. Go to **Settings > Pages**
3. Under **Source**, select **GitHub Actions**
4. Push to `main` branch - the workflow will auto-deploy
5. Your site will be live at `https://<username>.github.io/iptv/`

## Local Development

```bash
npm install
npm run dev
```

## Build for Production

```bash
npm run build
```

The static output will be in the `out/` directory.

## License

MIT
