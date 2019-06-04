const express = require("express");
const router = express.Router();
const Search = require('../../models/Search')
const validateSearchInput = require('../../validation/search');
const svc = require('../../services/artists');

router.get("/search", (req, res) => {
  //save query

  const {errors, isValid} = validateSearchInput(req.query);
  if(!isValid){
    return res.status(400).json(errors);
  }
  const newSearch = new Search({
    query: req.query.query
  })
  newSearch.save();

  //get query results
  svc.scrapePitchforkArtistSearch(req.query.query)
    .then(data => res.json(data))
    .catch(errors => res.status(400).json(errors));
})

router.get("/detail", (req, res) => {
  svc.scrapePitchforkArtistDetail(req.query.artistLink)
    .then(data=>res.json({[req.query.artistLink]: data}))
    .catch(errors => res.status(400).json(errors));
})

module.exports = router;