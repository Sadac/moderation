const express = require('express');
const bodyParser = require('body-parser'); // eslint-disable-line
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {
  const { type, data } = req.body;

  if (type === 'CommentCreated') {
    // if content has word orange (simulation of bad comment) reject it, otherwise approve
    const status = data.content.includes('orange') ? 'rejected' : 'approved';

    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }

  res.send({});
});

const port = 4003;
app.listen(port, () => {
  console.log(`:::: MODERATION SERVICE: Listening on port ${port} ::::`);
});
