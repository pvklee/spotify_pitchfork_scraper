import React from 'react';

const PitchforkReview = ({currentAlbumInfo}) => {
  if (!currentAlbumInfo) {return null};
  return(
    <div>{currentAlbumInfo.body}</div>
  )
}

export default PitchforkReview;