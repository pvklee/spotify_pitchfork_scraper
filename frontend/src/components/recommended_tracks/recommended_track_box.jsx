import React from 'react';

export default ({spotifyData, pitchforkData}) => {
  const trackName = spotifyData.name;
  const artist = spotifyData.artists[0].name;
  const albumName = spotifyData.album.name;
  const albumId = spotifyData.album.id;
  const pitchforkAlbumName = pitchforkData[albumId] ? pitchforkData[albumId].titles[0] : null;
  const albumScore = pitchforkData[albumId] ? pitchforkData[albumId].scores[0] : null;
  const albumAbstract = pitchforkData[albumId] ? pitchforkData[albumId].abstract : null;
  return(
    <div>
      <div>
        <h2>{trackName}</h2>
        <ul>
          <li>{artist}</li>
          <li>{albumName}</li>
          <li>{albumId}</li>
          <li><h2>Pitchfork Info</h2></li>
          <li>Title: {pitchforkAlbumName}</li>
          <li>Score: {albumScore}</li>
          <li>Abstract: {albumAbstract}</li>
        </ul>
      </div>
    </div>
  )
}