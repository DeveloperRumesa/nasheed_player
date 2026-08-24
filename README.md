# Peace Player — Quran & Nasheed Player

Peace Player is a serene, responsive web application built with vanilla JavaScript and Vite. It provides a smooth audio streaming experience for recitations and vocal nasheeds, featuring category filtering, live search, dynamic UI state persistence, and full player controls.

## Features

- **Audio Playback:** Complete player controls including Play/Pause, Next, Previous, Shuffle, and Repeat modes.
- **Category & Artist Filtering:** Easily filter tracks by category (e.g., *Quran Recitation*, *Muhammad Al Muqit*, *Nadeem Mohammed*, *Ahmed Bukhatir*, *Free Palestine*).
- **Instant Live Search:** Real-time search across track titles and reciters/artists.
- **State Persistence:** Automatically saves your volume preference and last played track in `localStorage` across browser sessions.
- **Interactive Equalizer & Scrubbing:** Custom progress bar scrubbing, animated equalizer indicators, and volume/mute toggles.
- **Keyboard Shortcuts:**
  - `Space`: Play / Pause
  - `Arrow Right`: Next track
  - `Arrow Left`: Previous track
  - `M`: Toggle Mute

## Tech Stack

- **HTML5 & CSS3** (Custom UI layout & modern responsive design)
- **JavaScript (ES6+)** (DOM manipulation, HTML5 Audio API, LocalStorage)
- **Vite** (Frontend build tool)
