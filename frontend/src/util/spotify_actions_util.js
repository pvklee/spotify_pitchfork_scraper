//gets top 5 artists based on recently listened songs.
export const getTopFiveArtistsCommaSeparated = (songs) => {
  let artists = [];
  songs.forEach((song) => {
    artists = artists.concat(song.track.artists)
  })
  let topFive = [];
  let artistCount = {};
  artists.forEach((artist, index) => {
    const recentBonus = (50-index)/25;
    artistCount[artist.id] = artistCount[artist.id] ?
      artistCount[artist.id] + 1 + recentBonus
      : 1 + recentBonus;
    if (topFive.length === 0) {
      topFive.push(artist.id)
    } else {
      let insert;
      let alreadyCounted = false;
      for(insert = 0; insert<topFive.length; ++insert){
        if(artistCount[artist.id] === artistCount[topFive[insert]]) {
          alreadyCounted = true;
          break;
        }
        if(artistCount[artist.id] < artistCount[topFive[insert]]) break;
      }
      if (alreadyCounted === true) {
        topFive.sort((a,b) => (artistCount[a] > artistCount[b]) ? 1 : ((artistCount[b] > artistCount[a]) ? -1 : 0))
      } else if(topFive.length < 5) {
        topFive.splice(insert, 0, artist.id);
      } else if(insert > 0){
        topFive.splice(insert, 0, artist.id);
        topFive.shift();
      }
    }
  })
  return topFive.join(',');
}

//gets hash params after spotify login
export const getHashParams = (location) => {
  var hashParams = {};
  var e, r = /([^&;=]+)=?([^&;]*)/g,
      q = location.substring(1);
  e = r.exec(q)
  while (e) {
     hashParams[e[1]] = decodeURIComponent(e[2]);
     e = r.exec(q);
  }
  return hashParams;
}