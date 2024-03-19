import http from 'http';
import express from 'express';
import logger from './middleware/logger.js';
import authorRouter from './routes/authors.route.js';
import bookRouter from './routes/books.route.js';

const app = express();

app.use(express.json());
app.use(logger);
app.use('/books', bookRouter);
app.use('/authors', authorRouter);

app.all('*', (req, res) => {
  res.status(404).jsonp({ message: 'Page not found' });
});

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
