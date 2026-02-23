import { createServer } from 'node:http';
import app from './app';
import mongoose from 'mongoose';

const server = createServer(app);

mongoose.connect('mongodb://localhost:27017/its-cart')
.then(() => {
  server.listen(3000, () => {
    console.log(`server listening on port 3000`);
  });
})
.catch(err => {
  console.error(err);
})
