document.addEventListener("DOMContentLoaded", function () {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const artistName = urlParams.get("artist");

  if (artistName) {
    searchDeezerArtist(artistName);
  } else {
    console.error("Nome dell'artista non fornito nella query string");
  }
});

function searchDeezerArtist(artistName) {
  const artistUrl = `https://deezerdevs-deezer.p.rapidapi.com/search?q=${artistName}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ce3a955d3dmsh2c1fe4098c8de2bp164eaajsn97005f1f60ae",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  fetch(artistUrl, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`errore pay att!: ${response.status}`);
      }
    })
    .then((artistData) => {
      displayResults(artistData);
    })
    .catch((error) => {
      console.error(error);
    });
}

function displayResults(artistData) {
  console.log("Artist Data:", artistData);

  const imgBg = document.getElementById("imgBg");
  // let songHTML = "";

  if (artistData && artistData.data) {
    const albums = artistData.data;
    console.log("Albums:", albums);
    imgBg.src = albums[0].artist.picture_xl;

    albums.forEach((album, index) => {
      const resultsContainer = document.getElementById("containerSongs");
      // const albumTitle = album.album.title;
      const songTitle = album.title;

      const duration = album.duration + "s";
      const albumImage = album.album.cover_medium;
      // const tracks = album.album.tracklist;
      const rank = album.rank;

      const template = `
<div class="col-1 songPlay " data-preview=${album.preview} >▶</div>
<div class="col-1 songNum">${index + 1}</div>
<div class="col-2 albumImg gx-1"><img src="${albumImage}" /></div>
<div class="col-4 d-flex me-auto"><a href="#">${songTitle}</a></div>
<div class="col-3 d-none d-md-block">${rank}</div>
<div class="col-1 fs-6 heartIcon">♡</div>
<div class="col-1">${duration}</div>`;

      const songHTML = document.createElement("div");
      songHTML.classList.add("row", "popularSongs", "align-items-center", "p-2", "track");
      songHTML.innerHTML = template;
      resultsContainer.appendChild(songHTML);

      songHTML.addEventListener("click", function (e) {
        const previewUrl = e.target.dataset.preview;
        const songTitle = e.target.dataset.songTitle;
        const newUrl = `./index.html?preview=${encodeURIComponent(previewUrl)}&title=${encodeURIComponent(songTitle)}`;
        window.location.href = newUrl;
        const audioPlayer = document.getElementById("audio-player");
        audioPlayer.querySelector(("#sourceSong".src = previewUrl));
        audioPlayer.load();
        audioPlayer.play();
        // window.location.href = `./index.html`;
      });
    });
  } else {
    console.error("Dati dell'artista non validi");
  }
}
