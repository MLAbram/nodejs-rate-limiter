// https://www.npmjs.com/package/express-rate-limit


const express = require('express');
const app = express();
const expressLimiter = require('express-rate-limit');

const defaultLimiter = expressLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 12,
  message: 'Too many requests from this IP...'
});

const apiLimiter = expressLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 3,
  message: 'Too many requests from this IP...'
});

const hbsLimiter = expressLimiter({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 3,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const loginLimiter = expressLimiter({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3,
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


app.use(defaultLimiter);
app.use('/api', apiLimiter);

app.get('/', (req, res) => {
  return res.status(200).send('Home Page');
});

app.get('/login', (req, res) => {
  return res.status(200).send('Login Page');
});

app.get('/api/v1', (req, res) => {
  return res.status(200).send('API Page');
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000.');
});
