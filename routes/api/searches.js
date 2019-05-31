const express = require("express");
const router = express.Router();
const Search = require('../../models/Search')
// const validateSearchInput = require('../../validation/search');

router.get("/test", (req, res) => {
  res.json({
    msg: "This is the searches route"
  })
})

module.exports = router;