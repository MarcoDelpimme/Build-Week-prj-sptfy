document.getElementById("searchForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const artistName = document.getElementById("artistName").value;

  //encodeURIComponent lho usato per far si che se nel form vengano inseriti degli spazi o dei caratteri speciali essi vengano convertiti senza causa problemi durante il reindirazzamento
  window.location.href = `artistpage.html?artist=${encodeURIComponent(artistName)}`;
});
