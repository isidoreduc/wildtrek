const app = require('./app');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// path to environment variables config
dotenv.config({ path: './config.env' });
const port = process.env.PORT || 3000;

// mongoose connecection
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('Connection successfull'));

const tourSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Name is mandatory'], unique: true },
  rating: { type: Number, default: 4.5 },
  price: { type: Number, require: [true, 'Price is mandatory'] }
});

const Tour = mongoose.model('Tour', tourSchema);
const testTour = new Tour({
  name: 'Ceahlau',
  price: 234
});

testTour
  .save()
  .then(doc => console.log(doc))
  .catch(err => console.log(err));

// server listening for requests
app.listen(port, () => console.log(`app runing on port ${port}...`));
