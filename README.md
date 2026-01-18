# Tech Sierra Solutions

![Live Site](https://img.shields.io/badge/Live-techsierrasolutions.com-blue?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**Tech Sierra Solutions** - Elite Full-Stack Architecture & AI Solutions

> A modern portfolio showcasing 26+ production-ready AI platforms, enterprise solutions, and blockchain infrastructure.

---

## Tech Stack

- **Frontend**: React + TypeScript (pre-compiled static)
- **Styling**: Tailwind CSS
- **Deployment**: Digital Ocean + Cloudflare CDN
- **PWA**: Service Worker with offline caching
- **SSL**: Let's Encrypt (auto-renewal)

---

## Features

- Progressive Web App - Installable on mobile/desktop
- Offline Support - Full functionality without internet
- 26+ Projects Showcase - Interactive gallery
- Video Showcases - AI-generated content demos
- Multi-Domain Support - techsierrasolutions.com, tss.techsierrasolutions.com

---

## Project Structure

```
techsierrasolutions/
├── index.html              # Main landing page
├── projects.html           # Projects showcase
├── projects.json           # Project data
├── manifest.json           # PWA manifest
├── sw.js                   # Service Worker
├── deploy.sh               # Deployment script
├── assets/                 # Compiled JS/CSS
├── projects/               # Project screenshots
├── videos/                 # Video showcases
│   ├── desert-squatch.mp4
│   └── yamaha-tech.mp4
└── tss-*.svg               # TechSierra branding
```

---

## Deployment

### Production Server

| Domain | Server | Path |
|--------|--------|------|
| techsierrasolutions.com | Digital Ocean | /opt/tech-sierra-portfolio/ |
| tss.techsierrasolutions.com | Digital Ocean | /opt/tech-sierra-portfolio/ |

### Quick Deploy

```bash
# From local machine
./deploy.sh

# OR manually
ssh root@104.248.23.145 "cd /opt/tech-sierra-portfolio && git pull origin master"
```

### Local Development

```bash
# Clone
git clone https://github.com/murbati91/techsierrasolutions.git
cd techsierrasolutions

# Run local server
npm run dev
# OR
npx serve .
```

---

## Infrastructure

- **Server**: Digital Ocean (104.248.23.145)
- **CDN**: Cloudflare (Full strict SSL)
- **Web Server**: Nginx
- **SSL**: Let's Encrypt (expires 2026-04-18)
- **GitHub**: murbati91/techsierrasolutions

---

## Portfolio Highlights

- **GeoPoint GIS Platform** - Geospatial intelligence
- **AI Website Builder** - Multi-provider AI generator
- **Gulf Charter AI** - Arabic-English ethical guidance
- **Print2Go** - E-commerce with AI designer
- **KFM Ticketing** - Event platform
- **MenaPool** - Crypto mining pool
- **Desert Squatch** - AI video generation

---

## License

MIT License - Copyright (c) 2026 Tech Sierra Solutions

---

**Built with excellence by Tech Sierra Solutions**
