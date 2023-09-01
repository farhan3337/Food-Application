const express = require('express');
const cors = require('cors');
const app = express();
const {PORT} = require('./config/index')
const dbConnect = require('./database/db.js');

app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(express.json());

app.use('/api', require('./routes/CreateUser'));
app.use('/api', require('./routes/DisplayData'));
app.use('/api', require('./routes/OrderData'));
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Backend is running successfully on ${PORT}`)
})

dbConnect();