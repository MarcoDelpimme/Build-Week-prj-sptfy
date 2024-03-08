document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const artistName = document.getElementById("artistName").value;

  //encodeURIComponent lho usato per far si che se nel form vengano inseriti degli spazi o dei caratteri speciali essi vengano convertiti senza causa problemi durante il reindirazzamento
  window.location.href = `artistpage.html?artist=${encodeURIComponent(artistName)}`;
});

const getGreeting = (greetingPlaceholder) => {
  const date = new Date();
  const time = date.getHours();

  if (time < 12) {
    greetingPlaceholder.innerText = "Buongiorno";
  } else if (time >= 12 && time < 18) {
    greetingPlaceholder.innerText = "Buon Pomeriggio";
  } else {
    greetingPlaceholder.innerText = "Buonasera";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const greetingPlaceholder = document.getElementById("greeting");
  if (greetingPlaceholder) {
    getGreeting(greetingPlaceholder);
  } else {
    console.error("Elemento 'greeting' non trovato");
  }
});

async function getAlbumInfo(albumId) {
  const albumUrl = `https://deezerdevs-deezer.p.rapidapi.com/album/${albumId}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "ce3a955d3dmsh2c1fe4098c8de2bp164eaajsn97005f1f60ae",
      "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(albumUrl, options);
    console.log(response);
    if (!response.ok) {
      throw new Error(`Errore: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    const albumInfo = {
      id: data.id,
      title: data.title,
      cover_medium: data.cover_medium,
      artist: data.artist.name,
      tracks: data.tracks.data,
    };
    console.log(data);
    return albumInfo;
  } catch (errore) {
    console.error(errore.message);
    return null;
  }
}

async function getAlbumsInfoByIds(albumIds) {
  const albumInfoArray = [];

  for (const albumId of albumIds) {
    const albumInfo = await getAlbumInfo(albumId);
    if (albumInfo) {
      albumInfoArray.push(albumInfo);
    }
  }

  return albumInfoArray;
}

const albumIds = [
  595243, 75378, 122366, 382685427, 199146112, 7079242, 66768702, 253927, 212377, 9410100, 441697007, 239901952,
  11611626, 373880, 73776,
];

const shuffleAlbum = albumIds.sort(() => Math.random() - 0.5).slice(0, 6);
getAlbumsInfoByIds(shuffleAlbum).then((albumInfoArray) => {
  console.log(albumInfoArray);

  albumInfoArray.forEach((albumInfo) => {
    const containerSugg = document.getElementById("containerSuggested");
    const sugHTML = document.createElement("div");
    sugHTML.classList.add("col-4", "col-md-3", "col-lg-2", "discCards");
    const templateSug = `
  
    <a href="./album2.html?id=${albumInfo.id}">
    <div class="discCovers border-radius rounded-circle">
    <img src="${albumInfo.cover_medium}" class="img-fluid border-radius rounded-circle" />
    </div>
    <div class="discText">
    <p class="subtitles mb-0 mt-2">${albumInfo.title}</p>
    <p>Ultima uscita</p>
    </div>
<a/>
  `;
    sugHTML.innerHTML = templateSug;
    containerSugg.appendChild(sugHTML);
  });
});
