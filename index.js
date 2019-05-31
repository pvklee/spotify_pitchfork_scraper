const axios = require('axios');
const cheerio = require('cheerio');


let reviewLinks = [];
let reviewInfo = [];

let reviewPagesAxios = [];
for (i = 1; i <= 5; i++){
  reviewPagesAxios.push(axios.get(`https://pitchfork.com/reviews/albums/?page=${i}`));
}

reviewPagesAxios = [
  axios.get(`https://pitchfork.com/artists/34205-snail-mail/`)
];

axios.all(reviewPagesAxios)
  .then((axios.spread((...responses) => {
    responses.forEach(response => {
      if(response.status === 200) {
        const html = response.data;
        const $ = cheerio.load(html);
        $('.review__link').each((i, elem) => {
          reviewLinks.push({
            url: elem.attribs.href
          })
        });
      }
    })

    const reviewLinksAxios = reviewLinks.map(link => (
      axios.get(`https://pitchfork.com`+link.url)
    ))

    axios.all(reviewLinksAxios)
      .then((axios.spread((...responses) => {
        responses.forEach(response => {
          if(response.status === 200) {
            const html = response.data;
            const $ = cheerio.load(html);
            const info = {};
            $('.score').each((i, elem) => {
              info.score = elem.children[0].data;
            })
            $('.single-album-tombstone__review-title').each((i, elem) => {
              info.title = elem.children[0].data;
            })
            reviewInfo.push(info);
          }
        })
        console.log(reviewInfo);
      })))
      .catch(err => console.log(err));
  })))
  .catch(err => console.log(err));

