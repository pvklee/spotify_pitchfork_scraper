import React from 'react';
import "./pitchfork_review.css"

const PitchforkReview = ({currentAlbumInfo}) => {
  if (!currentAlbumInfo) {return null};
  const {abstract, body, score, link, reviewAuthor, title} = currentAlbumInfo;
  const bodyText = body.map(paragraph => (
    <p>{paragraph}</p>
  ))

  return(
    <div className="review">
      <a href={`https://pitchfork.com` + link} target="_blank">
        <div className="review-header">
          <div className="review-title-author">
            <div className="review-title">
              <h1>
                {title}
              </h1>
            </div>
            <div className="review-author">
              Review by {reviewAuthor}
            </div>
          </div>
          <div className="review-score">
            {score}
          </div>
        </div>
      </a>

      <div className="review-content">
        <div className="review-abstract">
          {abstract}
        </div>
        <div className="review-body">
          {bodyText}
        </div>
      </div>
    </div>
  )
}

export default PitchforkReview;