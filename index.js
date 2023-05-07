const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const PORT = process.env.PORT || 3000;

const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const stripeRoute = require('./routes/stripe');
const path = require('path');

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Apply middleware
app.use(cors());
app.use(express.json());

// Apply routes
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute);
app.use('/api/checkout', stripeRoute);

// Serve static files
app.use(express.static(path.join(__dirname, './client/build')));
app.get('*', function(_, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function(
    err
  ) {
    res.status(500).send(err);
  });
});

// Connect to the database before listening
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log('listening for requests');
  });
});





