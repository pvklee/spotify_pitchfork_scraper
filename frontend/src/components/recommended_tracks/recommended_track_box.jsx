import React from 'react';

export default ({spotifyData, pitchforkData}) => {
  const trackName = spotifyData.name;
  const artist = spotifyData.artists[0].name;
  const albumName = spotifyData.album.name;
  const albumId = spotifyData.album.id;
  const albumArt = spotifyData.album.images[0].url;
  const pitchforkAlbumName = pitchforkData.title;
  const albumScore = pitchforkData.score;
  const albumAbstract = pitchforkData.abstract;
  const albumBody = pitchforkData.body;
  const pitchforkUrl = "https://pitchfork.com" + pitchforkData.link;
  return(
    <div>
      <div>
        <h2>{trackName}</h2>
        <ul>
          <li>{artist}</li>
          <li>{albumName}</li>
          <li>{albumId}</li>
          <li><img src={albumArt}/></li>
          <li><h2>Pitchfork Info</h2></li>
          <li>Title: {pitchforkAlbumName}</li>
          <li>Score: {albumScore}</li>
          <li>Abstract: {albumAbstract}</li>
          <li>Body: {albumBody}</li>
          <li><a href={pitchforkUrl}>Link</a></li>
        </ul>
      </div>
    </div>
  )
}