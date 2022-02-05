// this tells the page that we are using express
const express = require("express");
const fs = require("fs");
const path = require("path");
const PORT = process.env.PORT || 3002;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require ('./routes/htmlRoutes')
const notes = require("./data/data.json");
const app = express();

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static(__dirname));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
