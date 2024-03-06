const artistName = "ARTIST_NAME";

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
      console.log(response);
      return response.json();
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  })
  .then((albumData) => {
    const albumInfo = {
      title: albumData.title,
      imageUrl: albumData.cover_medium,
    };

    createAlbumCard(albumInfo);
  })
  .catch((error) => {
    console.error(error);
  });

function createAlbumCard(albumInfo) {
  const cardContainer = document.getElementById("albumCardContainer");

  const cardDiv = document.createElement("div");
  cardDiv.className = "row g-0 background-card mb-3";

  const imageDiv = document.createElement("div");
  imageDiv.className = "col-md-4";

  const image = document.createElement("img");
  image.src = albumInfo.imageUrl;
  image.className = "img-fluid rounded-start";
  image.style = "height: 100%; min-width: 100%";
  image.alt = "...";

  const textDiv = document.createElement("div");
  textDiv.className = "col-md-8 d-flex align-items-center ps-2";

  const title = document.createElement("h6");
  title.className = "card-title";
  title.textContent = albumInfo.title;

  imageDiv.appendChild(image);
  textDiv.appendChild(title);
  cardDiv.appendChild(imageDiv);
  cardDiv.appendChild(textDiv);
  cardContainer.appendChild(cardDiv);
}

createAlbumCard(albumInfo);
