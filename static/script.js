const queryInput = document.getElementById('queryInput');
const audioPlayer = document.getElementById('audioPlayer');
const dropDown = document.getElementById('dropDown');
const suggestionBox = document.getElementById('suggestionBox');
const queryForm = document.getElementById('queryForm');
const queueContainer = document.getElementById('queueContainer');
const nowPlaying = document.getElementById("nowPlaying");

let queueIndex = 0;
let queue = [];
let debounceTimer = null;

queryInput.addEventListener('input', () => {
  const query = queryInput.value.trim();
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    if (query.length < 2) {
      dropDown.innerHTML = '';
      suggestionBox.style.visibility = 'hidden';
      return;
    }

    suggestionBox.style.visibility = 'visible';

    fetch(`/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        dropDown.innerHTML = '';

        data.forEach(item => {
          const option = document.createElement('option');
          option.className = 'option';
          option.value = `https://www.youtube.com/watch?v=${item.id}`;
          option.textContent = item.title;
          dropDown.appendChild(option);
        });

        if (data.length === 0) {
          suggestionBox.style.visibility = 'hidden';
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        suggestionBox.style.visibility = 'hidden';
      });
  }, 1000);
});

queryForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const query = queryInput.value.trim();
  queryInput.value = '';

  const selectedOption = dropDown.selectedIndex >= 0 ? dropDown.options[dropDown.selectedIndex] : null;

  const response = selectedOption
    ? selectedOption.value
    : ("ytsearch1:" + query);

  dropDown.innerHTML = '';
  dropDown.selectedIndex = -1;
  suggestionBox.style.visibility = 'hidden';

  nowPlaying.textContent = "";
  nowPlaying.textContent = "🔍 Searching...";

  fetch('search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: response })
  })
    .then(res => res.json())
    .then(data => {
      const results = Array.isArray(data) ? data : [data];

      results.forEach(item => {
        if (item.error) {
          nowPlaying.textContent = "❌ Error loading audio";
          alert("Error fetching stream: " + item.error);
          return;
        }

        if (item.url) {
          queue.push({
            title: item.title,
            url: item.url
          });

          updateQueue();

          if (!isAudioPlaying()) {
            playQueue();
          } else {
            nowPlaying.textContent = "";
          }
        }
      });
    })
    .catch(err => {
      nowPlaying.textContent = "❌ Error loading stream";
      console.error('Fetch error:', err);
    });
});

function isAudioPlaying() {
  return !audioPlayer.paused && !audioPlayer.ended && audioPlayer.readyState > 2;
}

function updateQueue() {
  queueContainer.innerHTML = "";

  queue.forEach((item, index) => {
    const p = document.createElement("p");
    p.textContent = `${index + 1}. ${item.title}`;
    queueContainer.appendChild(p);
  });
}

function playQueue() {
  if (queueIndex >= queue.length) {
    nowPlaying.textContent = queue[queueIndex].title;
    return;
  }
  const current = queue[queueIndex];
  audioPlayer.src = current.url;
  nowPlaying.textContent = `🎵 Now Playing: ${current.title}`;
  audioPlayer.load();
  audioPlayer.play().catch(err => {
    alert("Autoplay prevented: " + err);
  });
}

audioPlayer.addEventListener('ended', () => {
  queueIndex++;
  if (queueIndex < queue.length) {
    playQueue();
  }
});
