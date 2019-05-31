const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const searches = require("./routes/api/searches");

const app = express();
const db = require('./config/keys').mongoURI;
mongoose
  .connect(db, {useNewUrlParser: true})
  .then(()=> console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/api/searches", searches);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));