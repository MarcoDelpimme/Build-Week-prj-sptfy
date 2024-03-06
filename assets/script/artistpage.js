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

  const resultsContainer = document.getElementById("resultsContainer");

  resultsContainer.innerHTML = "";

  if (artistData && artistData.data) {
    const albums = artistData.data;
    console.log("Albums:", albums);

    albums.forEach((album) => {
      const albumTitle = album.album.title;
      const albumImage = album.album.cover_medium;
      const tracks = album.album.tracklist;

      console.log("Album Title:", albumTitle);
      console.log("Album Image:", albumImage);
      console.log("Tracks:", tracks);

      const albumDiv = document.createElement("div");
      albumDiv.className = "album-info";

      const imageElement = document.createElement("img");
      imageElement.src = albumImage;
      imageElement.alt = albumTitle;

      const titleParagraph = document.createElement("p");
      titleParagraph.textContent = `Album: ${albumTitle}`;

      albumDiv.appendChild(imageElement);
      albumDiv.appendChild(titleParagraph);

      resultsContainer.appendChild(albumDiv);
    });
  } else {
    console.error("Dati dell'artista non validi");
  }
}
