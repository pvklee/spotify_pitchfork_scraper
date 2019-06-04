const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const artists = require("./routes/api/artists");
const spotify_auth = require("./routes/api/spotify_auth");

const app = express();
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=> console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors())
app.use(cookieParser());
app.use("/api/artists", artists);
app.use("/api/spotify_auth", spotify_auth);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));