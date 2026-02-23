import { createServer } from 'node:http';
import app from './app';

const server = createServer(app);

server.listen(3000, () => {
    console.log(`server listening on port 3000`);
});