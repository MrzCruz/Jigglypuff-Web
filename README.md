# 🎵 Jigglypuff: Web

Jigglypuff: Web is a lightweight, browser-based YouTube audio player built with Flask, JavaScript, and `yt_dlp`. It features a minimal UI, live search suggestions, audio queue management, theme switching (light/dark), and persistent playback using `localStorage`.

---

## 🚀 Features

- 🔍 Live YouTube search with suggestions
- 🎧 Audio streaming using `yt_dlp`
- 📜 Song queue with next/previous controls
- ♻️ Loop, seek, skip, and autoplay support
- 🌘 Dark/Light theme toggle with `localStorage`
- 💾 Queue and current song saved between sessions
- 🧠 Media Session API integration for system media controls

---

## 📁 Project Structure

```
Jigglypuff-Web/
├── server.py          # Flask backend entry point
├── yt.py              # YouTube search & stream URL logic via yt_dlp
├── templates/
│   └── index.html     # Main HTML UI
├── static/
│   ├── script.js      # All frontend logic (player, queue, search, etc.)
│   └── style.css      # Custom responsive and themed styles
```

---

## 🛠️ Installation

### Requirements:
- Python 3.7+
- `yt_dlp`
- `Flask`

### 🔧 Install dependencies:

```bash
pip install flask yt_dlp
```

---

## 🧪 How to Run

1. Clone the repo:
```bash
git clone https://github.com/MrzCruz/Jigglypuff-Web.git
cd Jigglypuff-Web
```

2. Start the Flask server:
```bash
python server.py
```

3. Open your browser and visit:
```
http://localhost:5000/
```

---

## 💡 Usage

- Use the search bar to find a song (e.g., `Imagine Dragons`)
- Click the suggested result or press Enter to queue it
- Use the player controls at the bottom to play/pause/skip
- The queue is saved in `localStorage`, so your session is remembered
- Use the 🌓 toggle button to switch themes

---

## 📦 Tech Stack

- **Backend**: Flask, Python, `yt_dlp`
- **Frontend**: HTML5, Vanilla JS, CSS3
- **Other**: Media Session API, LocalStorage

---

## 📌 TODO / Roadmap

- [ ] Volume control slider
- [ ] Drag-and-drop queue reorder
- [ ] Mobile layout refinements
- [ ] Search suggestions from multiple sources (e.g. playlists, history)

---

## ⚖️ License

This project is open-source and available under the [MIT License](LICENSE).

---

## ✨ Author

Made with ❤️ by [MrzCruz](https://github.com/MrzCruz)
