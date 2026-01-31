import express from 'express';

const timer = express.Router();

timer.get('/', (req, res) => {
  // check auth
  if (req.user === undefined) {
    res.sendStatus(401);
    return;
  }

  res.sendStatus(200);
});

timer.post('/', (req, res) => {
  // check auth
});

export default timer;
