//imports
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const routes = require('./routes');
const mongoose = require('mongoose');


//Middleware functions

app.use(cors());
app.use(express.json());
app.use('/api', routes);


//mongo stuff
mongoose.connect(process.env.MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('mongodb connected');
})
.catch(err => console.log(err));


app.listen(PORT, console.log(`Server running on ${PORT}`));
