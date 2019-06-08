const axios = require('axios');
const cheerio = require('cheerio');
const stringSimilarity = require('string-similarity');


const scrapePitchforkArtistSearch = (query) => (
  axios.get(`https://pitchfork.com/search/?query=${query}`)
    .then(response => {
      let artistLinks = [];
      if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);

        $('a .artist-name').each((i, elem) => {
          artistLinks.push({
            artist: elem.firstChild.data,
            url: elem.parent.attribs.href
          })
        });
      }
      return artistLinks;
    })
    .catch(err => console.log(err))
)

const scrapePitchforkArtistDetail = artistLink => {
  let artistName = '';
  return axios.get(`https://pitchfork.com/artists/${artistLink}/`)
    .then(response => {
      if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        let reviewLinks = [];
        artistName = $('.artist-header__heading').text();
        $('#result-albumreviews .review__link').each((i, elem) => {
          reviewLinks.push({
            url: elem.attribs.href
          })
        });
        return reviewLinks.map(link => axios.get(`https://pitchfork.com` + link.url));
      }
    })
    .then(reviewLinksAxios => axios.all(reviewLinksAxios))
    .then(axios.spread((...responses) => {
      let allAlbumsInfo = [];
      responses.forEach(response => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          let albumInfo = {
            titles: [],
            years: [],
            scores: [],
            albumArtUrls: [],
            abstract: '',
            body: '',
          };
          $('.single-album-tombstone__review-title').each(function() {
            albumInfo.titles.push($(this).text());
          })
          $('.single-album-tombstone__meta-year').each(function() {
            albumInfo.years.push($(this).text().split(" ").pop());
          })
          $('.score').each(function() {
            albumInfo.scores.push($(this).text());
          });
          $('.single-album-tombstone__art').each(function() {
            albumInfo.albumArtUrls.push($(this).find('img').attr('src'));
          })
          albumInfo.abstract = $('.review-detail__abstract').text();
          albumInfo.body = $('.review-detail__text .contents').text();
          allAlbumsInfo.push(albumInfo);
        }
      })
      // return {[artistName]: allAlbumsInfo};
      return {
        name: artistName,
        reviews: allAlbumsInfo
      };
    }))
}

const scrapePitchforkAlbumSearches = albumsArray => {

  pitchforkAlbumsInfo = albumsArray.map(album => ({[album.albumId] : {}}));
  let albumsWithReviews = [];
  
  const albumSearchesAxios = albumsArray.map((album, index) => {
    albumsArray[index].albumTitle = albumsArray[index].albumTitle.split(/ [\(\[]/)[0];
    const query = encodeURI(album.artistName + " " + album.albumTitle);
    return axios.get(`https://pitchfork.com/search/?query=${query}`)
  });
  
  return axios.all(albumSearchesAxios)
    .then(axios.spread((...responses) => {
      responses.forEach((response, index) => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          let reviewResults = {};
          $('#result-albumreviews .review__link').each(function() {
            const pArtist = $(this).find('.review__title-artist').text();
            const pAlbum = $(this).find('.review__title-album').text();
            const link = $(this).attr('href');
            
            reviewResults[pArtist + " " + pAlbum] = link;
          });
          let reviewLink = null;
          const resultsToCompare = Object.keys(reviewResults);
          if(resultsToCompare.length === 1){
            reviewLink = reviewResults[resultsToCompare[0]];
          } else if(resultsToCompare.length > 1){
            const actualArtistAlbum = albumsArray[index].artistName + " " + albumsArray[index].albumTitle;
            const match = stringSimilarity.findBestMatch(actualArtistAlbum, resultsToCompare);
            reviewLink = reviewResults[match.bestMatch.target];
          }
          if(reviewLink) {
            albumsWithReviews.push({
              albumId: albumsArray[index].albumId,
              link: reviewLink,
              spotifyTitle: albumsArray[index].albumTitle
            })
          };
        }
      })
      const reviewLinksAxios = albumsWithReviews.map(album => axios.get(`https://pitchfork.com` + album.link));
      return reviewLinksAxios;
    }))
    .then(reviewLinksAxios => axios.all(reviewLinksAxios))
    .then(axios.spread((...responses) => {
      responses.forEach((response, index) => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          let listedAlbums = {};
          $('.single-album-tombstone').each(function() {
            const title = $(this).find('.single-album-tombstone__review-title').text(),
                  year = $(this).find('.single-album-tombstone__meta-year').text().split(" ").pop(),
                  score = $(this).find('.score').text(),
                  albumArtUrl = $(this).find('.single-album-tombstone__art img').attr('src')
            listedAlbums[title] = {
              title,
              year,
              score,
              albumArtUrl
            }
          })

          const titlesToCompare = Object.keys(listedAlbums);
          if(titlesToCompare.length === 1){
            albumsWithReviews[index] = {...albumsWithReviews[index], ...listedAlbums[titlesToCompare[0]]}
          } else if (titlesToCompare.length > 1){
            const actualTitle = albumsWithReviews[index].spotifyTitle;
            const match = stringSimilarity.findBestMatch(actualTitle, titlesToCompare);
            albumsWithReviews[index] = {...albumsWithReviews[index], ...listedAlbums[match.bestMatch.target]}
          }
          albumsWithReviews[index].abstract = $('.review-detail__abstract').text();
          const body = $('.review-detail__text .contents p').map(function() {
            return $(this).text();
          });
          albumsWithReviews[index].body = body.get().join('\n\n');

        }
      })
      const albumsInfo = {};
      albumsWithReviews.forEach(album => (albumsInfo[album.albumId] = album));
      return albumsInfo;
    }))
    .catch(err => console.log(err))
}

module.exports = {
  scrapePitchforkArtistDetail,
  scrapePitchforkArtistSearch,
  scrapePitchforkAlbumSearches
};