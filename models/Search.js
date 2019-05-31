const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SearchSchema = new Schema({
  query: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Search = mongoose.model("searches", SearchSchema);