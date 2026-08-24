import './style.css'

// ===== Track Data =====
const tracks = [
  {
    id: 1,
    title: "My Mother (How Much I Love Her)",
    artist: "Muhammad Al Muqit",
    cover: "https://images.pexels.com/photos/8660463/pexels-photo-8660463.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://archive.org/download/muq01/33.%20Ya%20Ummi%20Maa.mp3",
    genre: "Muhammad Al Muqit",
    duration: "4:00"
  },
  {
    id: 2,
    title: "Loyalty",
    artist: "Muhammad Al Muqit",
    cover: "https://images.pexels.com/photos/17408101/pexels-photo-17408101.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://archive.org/download/Muhammad-AlMuqit-nasheed/Loyalty%20-%20Muhammad%20Al%20Muqit.mp3",
    genre: "Muhammad Al Muqit",
    duration: "3:30"
  },
  {
    id: 3,
    title: "Catch Me If I Fall",
    artist: "Nadeem Mohammed",
    cover: "https://images.pexels.com/photos/10157740/pexels-photo-10157740.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://archive.org/download/NASHEEDNEW_201803/Nadeem%20Mohammed%20-%20Falling%20Down%20%28Nasheed%29.mp3",
    genre: "Nadeem Mohammed",
    duration: "3:30"
  },
  {
    id: 4,
    title: "Without You",
    artist: "Nadeem Mohammed",
    cover: "https://images.pexels.com/photos/8832092/pexels-photo-8832092.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://archive.org/download/NASHEEDNEW_201803/Nadeem%20Mohammed%20-%20By%20Allah%20%28Official%20Acapella%20Video%29.mp3",
    genre: "Nadeem Mohammed",
    duration: "3:00"
  },
  {
    id: 5,
    title: "Turner of Hearts",
    artist: "Nadeem Mohammed",
    cover: "https://images.pexels.com/photos/38366758/pexels-photo-38366758.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://archive.org/download/NASHEEDNEW_201803/04.Nadeem%20Mohammed%20-%20Subhan%27Allah%20%28Official%20Acapella%20Video%29.mp3",
    genre: "Nadeem Mohammed",
    duration: "3:30"
  },
  {
    id: 6,
    title: "Ya Ummi",
    artist: "Ahmed Bukhatir",
    cover: "https://images.pexels.com/photos/35658665/pexels-photo-35658665.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://archive.org/download/AbdelAzizAlAhmedSura1AlFatiha_201906/Ahmed%20Bukhatir_%20Ya%20Ummi%20%28mom%29.mp3",
    genre: "Ahmed Bukhatir",
    duration: "4:49"
  },
  {
    id: 7,
    title: "Surah Al-Fatiha",
    artist: "Mishary Rashid Alafasi",
    cover: "https://images.pexels.com/photos/8832092/pexels-photo-8832092.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://server8.mp3quran.net/afs/001.mp3",
    genre: "Quran Recitation",
    duration: "0:30"
  },
  {
    id: 8,
    title: "Surah Al-Ikhlas",
    artist: "Mishary Rashid Alafasi",
    cover: "https://images.pexels.com/photos/38366758/pexels-photo-38366758.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://server8.mp3quran.net/afs/112.mp3",
    genre: "Quran Recitation",
    duration: "0:30"
  },
  {
    id: 9,
    title: "Surah Al-Falaq",
    artist: "Mishary Rashid Alafasi",
    cover: "https://images.pexels.com/photos/10157740/pexels-photo-10157740.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://server8.mp3quran.net/afs/113.mp3",
    genre: "Quran Recitation",
    duration: "0:30"
  },
  {
    id: 10,
    title: "Surah An-Nas",
    artist: "Mishary Rashid Alafasi",
    cover: "https://images.pexels.com/photos/7449446/pexels-photo-7449446.jpeg?auto=compress&cs=tinysrgb&h=300&w=300",
    audio: "https://server8.mp3quran.net/afs/114.mp3",
    genre: "Quran Recitation",
    duration: "0:30"
  },
  {
    id: 11,
    title: "Palestine Will Be Free (Vocals Only)",
    artist: "Maher Zain",
    cover: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=300&h=300&q=80",
    audio: "https://archive.org/download/mixvocalonlynasheeds/Palestine%20Will%20Be%20Free%20%28Vocals%20Only%20Versio%29.mp3",
    genre: "Free Palestine",
    duration: "4:55"
  },
  {
    id: 12,
    title: "Palestine (Vocals Only)",
    artist: "Muad",
    cover: "https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=300&h=300&q=80",
    audio: "https://archive.org/download/mixvocalonlynasheeds/Freedom_-_Vocal.mp3",
    genre: "Free Palestine",
    duration: "3:45"
  }
]

const genres = ["All", "Muhammad Al Muqit", "Nadeem Mohammed", "Ahmed Bukhatir", "Free Palestine", "Quran Recitation"]

// ===== State =====
let currentIndex = 0
let isPlaying = false
let isShuffle = false
let isRepeat = false
let activeGenre = "All"
let searchQuery = ""
let lastVolume = 1
let isMuted = false

// ===== Persistence =====
const STORAGE_KEY = "wave-player-state"

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}")
    if (typeof saved.volume === "number") {
      lastVolume = saved.volume
      isMuted = saved.volume === 0
    }
    if (typeof saved.trackId === "number") {
      const idx = tracks.findIndex(t => t.id === saved.trackId)
      if (idx >= 0) currentIndex = idx
    }
  } catch (e) {
    // ignore
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      volume: isMuted ? 0 : lastVolume,
      trackId: tracks[currentIndex]?.id
    }))
  } catch (e) {
    // ignore
  }
}

// ===== Audio =====
const audio = new Audio()
audio.preload = "metadata"

// ===== Icons =====
const ICONS = {
  play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>',
  pause: '<svg viewBox="0 0 24 24"><path d="M6 5h4v14H6zM14 5h4v14h-4z"/></svg>',
  prev: '<svg viewBox="0 0 24 24"><path d="M6 6h2v12H6zM9.5 12l8.5 6V6z"/></svg>',
  next: '<svg viewBox="0 0 24 24"><path d="M16 6h2v12h-16zM6 18l8.5-6L6 6z"/></svg>',
  shuffle: '<svg viewBox="0 0 24 24"><path d="M10.59 9.17 5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/></svg>',
  repeat: '<svg viewBox="0 0 24 24"><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>',
  volumeHigh: '<svg viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>',
  volumeMute: '<svg viewBox="0 0 24 24"><path d="M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  wave: '<svg viewBox="0 0 24 24"><path d="M3 12h2l2-7 3 14 3-10 2 5h6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  music: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
  empty: '<svg viewBox="0 0 24 24" fill="none" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'
}

// ===== Render =====
const app = document.querySelector('#app')

app.innerHTML = `
  <div class="layout">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-logo">${ICONS.wave}</div>
        <span class="brand-name">Wave</span>
      </div>
      <div class="search-wrap">
        ${ICONS.search}
        <input type="text" class="search-input" id="searchInput" placeholder="Search nasheeds or artists..." />
      </div>
      <div class="filter-label">Categories</div>
      <div class="genre-tabs" id="genreTabs"></div>
      <div class="sidebar-stats">
        <div class="stat">
          <span class="stat-value" id="trackCount">${tracks.length}</span>
          <span class="stat-label">Tracks</span>
        </div>
        <div class="stat">
          <span class="stat-value">${new Set(tracks.map(t => t.artist)).size}</span>
          <span class="stat-label">Artists</span>
        </div>
      </div>
    </aside>
    <main class="main-content">
      <div class="topbar">
        <h2 class="section-title" id="sectionTitle">All Tracks</h2>
        <div class="now-playing-badge">
          <span class="pulse-dot"></span>
          <span id="nowPlayingText">Paused</span>
        </div>
      </div>
      <div class="playlist-container" id="playlistContainer">
        <div class="playlist-header">
          <span>#</span>
          <span>Title</span>
          <span>Category</span>
          <span style="text-align:right">Time</span>
        </div>
        <div id="playlist"></div>
      </div>
    </main>
  </div>
  <div class="player-bar">
    <div class="player-track">
      <img class="player-cover" id="playerCover" src="" alt="Cover" />
      <div class="player-track-meta">
        <div class="player-track-title" id="playerTitle">—</div>
        <div class="player-track-artist" id="playerArtist">—</div>
      </div>
    </div>
    <div class="player-controls">
      <div class="control-buttons">
        <button class="ctrl-btn toggle" id="shuffleBtn" title="Shuffle">${ICONS.shuffle}</button>
        <button class="ctrl-btn" id="prevBtn" title="Previous">${ICONS.prev}</button>
        <button class="play-btn" id="playBtn">${ICONS.play}</button>
        <button class="ctrl-btn" id="nextBtn" title="Next">${ICONS.next}</button>
        <button class="ctrl-btn toggle" id="repeatBtn" title="Repeat">${ICONS.repeat}</button>
      </div>
      <div class="progress-row">
        <span class="time-label" id="currentTime">0:00</span>
        <div class="progress-bar" id="progressBar">
          <div class="progress-fill" id="progressFill"></div>
        </div>
        <span class="time-label" id="totalTime">0:00</span>
      </div>
    </div>
    <div class="player-extras">
      <button class="volume-btn" id="muteBtn" title="Mute">${ICONS.volumeHigh}</button>
      <div class="volume-wrap">
        <input type="range" class="volume-slider" id="volumeSlider" min="0" max="100" value="100" />
      </div>
    </div>
  </div>
`

// ===== Element refs =====
const els = {
  playlist: document.getElementById('playlist'),
  genreTabs: document.getElementById('genreTabs'),
  searchInput: document.getElementById('searchInput'),
  sectionTitle: document.getElementById('sectionTitle'),
  trackCount: document.getElementById('trackCount'),
  nowPlayingText: document.getElementById('nowPlayingText'),
  playerCover: document.getElementById('playerCover'),
  playerTitle: document.getElementById('playerTitle'),
  playerArtist: document.getElementById('playerArtist'),
  playBtn: document.getElementById('playBtn'),
  prevBtn: document.getElementById('prevBtn'),
  nextBtn: document.getElementById('nextBtn'),
  shuffleBtn: document.getElementById('shuffleBtn'),
  repeatBtn: document.getElementById('repeatBtn'),
  progressBar: document.getElementById('progressBar'),
  progressFill: document.getElementById('progressFill'),
  currentTime: document.getElementById('currentTime'),
  totalTime: document.getElementById('totalTime'),
  muteBtn: document.getElementById('muteBtn'),
  volumeSlider: document.getElementById('volumeSlider')
}

// ===== Helpers =====
function formatTime(sec) {
  if (!sec || isNaN(sec)) return "0:00"
  const m = Math.floor(sec / 60)
  const s = Math.floor(sec % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function getFilteredTracks() {
  return tracks.filter(t => {
    const matchGenre = activeGenre === "All" || t.genre === activeGenre
    const q = searchQuery.toLowerCase().trim()
    const matchSearch = !q || t.title.toLowerCase().includes(q) || t.artist.toLowerCase().includes(q)
    return matchGenre && matchSearch
  })
}

// ===== Render Playlist =====
function renderPlaylist() {
  const filtered = getFilteredTracks()
  els.trackCount.textContent = filtered.length

  if (filtered.length === 0) {
    els.playlist.innerHTML = `
      <div class="empty-state">
        ${ICONS.empty}
        <p>No tracks found. Try a different search or genre.</p>
      </div>
    `
    return
  }

  els.playlist.innerHTML = filtered.map((track, i) => {
    const realIndex = tracks.indexOf(track)
    const isActive = realIndex === currentIndex
    const showEq = isActive && isPlaying
    return `
      <div class="track-row ${isActive ? 'active' : ''}" data-index="${realIndex}">
        <div class="track-index">${i + 1}</div>
        <div class="play-icon">${ICONS.play}</div>
        <div class="track-info">
          <img class="track-cover" src="${track.cover}" alt="${track.title}" loading="lazy" />
          <div class="track-meta">
            <div class="track-title">${track.title}</div>
            <div class="track-artist">${track.artist}</div>
          </div>
        </div>
        <div class="track-genre">
          <span class="track-genre-badge">${track.genre}</span>
        </div>
        <div class="track-duration">
          ${showEq
            ? `<div class="equalizer"><span></span><span></span><span></span><span></span></div>`
            : track.duration}
        </div>
      </div>
    `
  }).join('')

  els.playlist.querySelectorAll('.track-row').forEach(row => {
    row.addEventListener('click', () => {
      const idx = parseInt(row.dataset.index, 10)
      if (idx === currentIndex) {
        togglePlay()
      } else {
        loadTrack(idx, true)
      }
    })
  })
}

// ===== Render Genre Tabs =====
function renderGenres() {
  els.genreTabs.innerHTML = genres.map(g => `
    <button class="genre-tab ${g === activeGenre ? 'active' : ''}" data-genre="${g}">${g}</button>
  `).join('')

  els.genreTabs.querySelectorAll('.genre-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      activeGenre = tab.dataset.genre
      els.sectionTitle.textContent = activeGenre === "All" ? "All Tracks" : activeGenre
      renderGenres()
      renderPlaylist()
    })
  })
}

// ===== Playback =====
function loadTrack(index, autoplay = false) {
  currentIndex = index
  const track = tracks[currentIndex]
  if (!track) return

  audio.src = track.audio
  els.playerCover.src = track.cover
  els.playerTitle.textContent = track.title
  els.playerArtist.textContent = track.artist
  els.progressFill.style.width = "0%"
  els.currentTime.textContent = "0:00"
  els.totalTime.textContent = track.duration

  saveState()
  renderPlaylist()

  if (autoplay) {
    audio.play().catch(() => {})
  }
}

function togglePlay() {
  if (audio.paused) {
    audio.play().catch(() => {})
  } else {
    audio.pause()
  }
}

function playNext() {
  if (isRepeat) {
    audio.currentTime = 0
    audio.play().catch(() => {})
    return
  }
  let next
  if (isShuffle) {
    next = Math.floor(Math.random() * tracks.length)
    if (next === currentIndex) next = (next + 1) % tracks.length
  } else {
    next = (currentIndex + 1) % tracks.length
  }
  loadTrack(next, true)
}

function playPrev() {
  if (audio.currentTime > 3) {
    audio.currentTime = 0
    return
  }
  const prev = currentIndex === 0 ? tracks.length - 1 : currentIndex - 1
  loadTrack(prev, true)
}

function updatePlayButton() {
  els.playBtn.innerHTML = isPlaying ? ICONS.pause : ICONS.play
  els.nowPlayingText.textContent = isPlaying ? "Now Playing" : "Paused"
  renderPlaylist()
}

// ===== Audio Events =====
audio.addEventListener('play', () => {
  isPlaying = true
  updatePlayButton()
})

audio.addEventListener('pause', () => {
  isPlaying = false
  updatePlayButton()
})

audio.addEventListener('timeupdate', () => {
  if (audio.duration) {
    const pct = (audio.currentTime / audio.duration) * 100
    els.progressFill.style.width = pct + "%"
    els.currentTime.textContent = formatTime(audio.currentTime)
  }
})

audio.addEventListener('loadedmetadata', () => {
  if (audio.duration && !isNaN(audio.duration)) {
    els.totalTime.textContent = formatTime(audio.duration)
  }
})

audio.addEventListener('ended', () => {
  playNext()
})

// ===== Controls =====
els.playBtn.addEventListener('click', togglePlay)
els.prevBtn.addEventListener('click', playPrev)
els.nextBtn.addEventListener('click', playNext)

els.shuffleBtn.addEventListener('click', () => {
  isShuffle = !isShuffle
  els.shuffleBtn.classList.toggle('active', isShuffle)
})

els.repeatBtn.addEventListener('click', () => {
  isRepeat = !isRepeat
  els.repeatBtn.classList.toggle('active', isRepeat)
})

// ===== Progress Bar Scrubbing =====
function seekFromEvent(e) {
  const rect = els.progressBar.getBoundingClientRect()
  const x = (e.clientX || (e.touches && e.touches[0].clientX) || 0) - rect.left
  const pct = Math.max(0, Math.min(1, x / rect.width))
  if (audio.duration) {
    audio.currentTime = pct * audio.duration
    els.progressFill.style.width = pct * 100 + "%"
  }
}

let isScrubbing = false

els.progressBar.addEventListener('mousedown', (e) => {
  isScrubbing = true
  seekFromEvent(e)
})

document.addEventListener('mousemove', (e) => {
  if (isScrubbing) seekFromEvent(e)
})

document.addEventListener('mouseup', () => {
  isScrubbing = false
})

els.progressBar.addEventListener('touchstart', (e) => {
  isScrubbing = true
  seekFromEvent(e)
}, { passive: true })

document.addEventListener('touchmove', (e) => {
  if (isScrubbing) seekFromEvent(e)
}, { passive: true })

document.addEventListener('touchend', () => {
  isScrubbing = false
})

// ===== Volume =====
function setVolume(value) {
  const vol = Math.max(0, Math.min(1, value))
  audio.volume = vol
  els.volumeSlider.value = Math.round(vol * 100)
  updateVolumeIcon(vol)
  if (vol > 0) {
    isMuted = false
    lastVolume = vol
  }
  saveState()
}

function updateVolumeIcon(vol) {
  els.muteBtn.innerHTML = (vol === 0 || isMuted) ? ICONS.volumeMute : ICONS.volumeHigh
}

els.volumeSlider.addEventListener('input', (e) => {
  const vol = parseInt(e.target.value, 10) / 100
  isMuted = false
  audio.muted = false
  setVolume(vol)
})

els.muteBtn.addEventListener('click', () => {
  if (isMuted || audio.volume === 0) {
    isMuted = false
    audio.muted = false
    setVolume(lastVolume || 0.8)
  } else {
    isMuted = true
    audio.muted = true
    els.volumeSlider.value = 0
    updateVolumeIcon(0)
    saveState()
  }
})

// ===== Search =====
els.searchInput.addEventListener('input', (e) => {
  searchQuery = e.target.value
  renderPlaylist()
})

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return
  if (e.code === 'Space') {
    e.preventDefault()
    togglePlay()
  } else if (e.code === 'ArrowRight') {
    playNext()
  } else if (e.code === 'ArrowLeft') {
    playPrev()
  } else if (e.code === 'KeyM') {
    els.muteBtn.click()
  }
})

// ===== Init =====
loadState()
renderGenres()
renderPlaylist()
loadTrack(currentIndex, false)
setVolume(lastVolume)
