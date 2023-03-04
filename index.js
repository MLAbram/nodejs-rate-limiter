const express = require('express');
const app = express();

const opts = {
    points: 6, // 6 points
    duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

rateLimiter.consume(remoteAddress, 2) // consume 2 points
    .then((rateLimiterRes) => {
        // 2 points consumed
    })
    .catch((rateLimiterRes) => {
        // Not enough points to consume
});
    
app.use(express.json());

app.get('/', (req, res) => {
  return res.status(200).send('Node.js');
});

app.listen(3000, () => {
  console.log('Server listening on port: 3000.');
});
