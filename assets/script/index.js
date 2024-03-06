document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const artistName = document.getElementById("artistName").value;

  window.location.href = `artistTestpage.html?artist=${encodeURIComponent(artistName)}`;
});
