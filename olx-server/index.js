const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const itemRoutes = require('./routes/items.route');
const userRoutes = require('./routes/user.route');

require('mongoose-type-url');
mongoose.set('strictQuery', false);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 
const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost:27017/veer', { useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{
  console.log('Connected to database '+ data.connection.host + " " + data.connection.name);
});

app.use('/items', itemRoutes);
app.use('/users', userRoutes);


const port = process.env.PORT || 3001;

app.listen(port, function () {
  console.log('Server started on port 3001');
});
