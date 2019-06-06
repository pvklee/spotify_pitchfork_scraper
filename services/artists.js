const axios = require('axios');
const cheerio = require('cheerio');

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

const scrapePitchforkAlbumSearches = albums => {
  let albumsArray = Object.values(albums);
  pitchforkAlbumsInfo = albumsArray.map(album => ({[album.albumId] : {}}));
  let albumsWithReviews = [];

  const albumSearchesAxios = albumsArray.map(album => {
    const query = encodeURI(album.artistName + " " + album.albumTitle.split(/[\(\[]/)[0]);
    return axios.get(`https://pitchfork.com/search/?query=${query}`)
  });
  
  return axios.all(albumSearchesAxios)
    .then(axios.spread((...responses) => {
      responses.forEach((response, index) => {
        if(response.status === 200) {
          const html = response.data;
          const $ = cheerio.load(html);
          const reviewLink = $('.review__link')[0] ? $('.review__link')[0].attribs.href : null;
          albumsArray[index]['link'] = reviewLink;
          if(reviewLink) {albumsWithReviews.push({albumId: albumsArray[index].albumId, link: reviewLink, titles: [], years: [], scores: [], albumArtUrls: []})};
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
          $('.single-album-tombstone__review-title').each(function() {
            albumsWithReviews[index].titles.push($(this).text());
          })
          $('.single-album-tombstone__meta-year').each(function() {
            albumsWithReviews[index].years.push($(this).text().split(" ").pop());
          })
          $('.score').each(function() {
            albumsWithReviews[index].scores.push($(this).text());
          });
          $('.single-album-tombstone__art').each(function() {
            albumsWithReviews[index].albumArtUrls.push($(this).find('img').attr('src'));
          })
          albumsWithReviews[index].abstract = $('.review-detail__abstract').text();
          albumsWithReviews[index].body = $('.review-detail__text .contents').text();
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