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

module.exports = {
  scrapePitchforkArtistDetail,
  scrapePitchforkArtistSearch
};