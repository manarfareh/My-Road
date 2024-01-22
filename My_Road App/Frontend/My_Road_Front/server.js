const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

app.post('/traffics', async (req, res) => {
  try {
    const response = await axios.post(
      'http://localhost:8088/ws',
      req.body,
      {
        headers: { 'Content-Type': 'text/xml' },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Serveur proxy en cours d'exécution sur le port ${port}`);
});
