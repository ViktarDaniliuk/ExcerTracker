const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ extended: true }));

const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
   useNewUrlParser: true,
   useCreateIndex: true,
   useUnifiedTopology: true
});
const connection = mongoose.connection;
connection.once('open', () => {
   console.log('MongoDB database connection established successfully');
});

const exercisesRoutes = require('./routes/exercises.routes');
const usersRoutes = require('./routes/users.routes');

app.use('/exercises', exercisesRoutes);
app.use('/users', usersRoutes);

app.listen(port, () => {
   console.log(`Server is running on port: ${port}`);
});