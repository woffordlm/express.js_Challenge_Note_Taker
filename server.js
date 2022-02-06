// this tells the page that we are using express
// variables are created to set up routes 
const express = require("express");
const PORT = process.env.PORT || 80;
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require ('./routes/htmlRoutes')
const app = express();

// middleware required
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(express.static(__dirname));

// api routes 
app.use('/api', apiRoutes);
app.use('/', htmlRoutes)

// this makes the server listen on the a given port though a template literal
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
