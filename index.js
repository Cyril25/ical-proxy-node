// index.js
const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

const AIRBNB_ICAL_URL = 'https://www.airbnb.fr/calendar/ical/1160174173295911644.ics?s=b14aa96311bec7c24999ed2509141cb8';

app.get('/ical', async (req, res) => {
  try {
    const response = await fetch(AIRBNB_ICAL_URL);
    if (!response.ok) throw new Error('Erreur lors du téléchargement du fichier iCal');

    const data = await response.text();
    res.set('Content-Type', 'text/calendar');
    res.set('Access-Control-Allow-Origin', '*');
    res.send(data);
  } catch (err) {
    res.status(500).send('Erreur serveur: ' + err.message);
  }
});

app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}/ical`);
});