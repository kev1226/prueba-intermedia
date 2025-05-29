const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());

mongoose.connect('mongodb://localhost:27017/clima', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log(' Conectado a MongoDB'))
.catch((err) => console.error('Error conectando a MongoDB:', err));

// Modelo Clima
const climaSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  time: String,
  interval: Number,
  temperature: Number,
  windspeed: Number,
  winddirection: Number,
  is_day: Number,
  weathercode: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Clima = mongoose.model('Clima', climaSchema);


app.get('/clima', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Faltan parámetros lat y lon' });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
    const response = await axios.get(url);
    const data = response.data.current_weather;

    const climaGuardado = await Clima.create({
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      time: data.time,
      interval: data.interval,
      temperature: data.temperature,
      windspeed: data.windspeed,
      winddirection: data.winddirection,
      is_day: data.is_day,
      weathercode: data.weathercode
    });

    res.json(climaGuardado);
  } catch (error) {
    console.error('Error al obtener el clima:', error.message);
    res.status(500).json({ error: 'Error obteniendo clima' });
  }
});


app.get('/historial', async (req, res) => {
  try {
    const historial = await Clima.find().sort({ createdAt: -1 }).limit(50);
    res.json(historial);
  } catch (error) {
    console.error('Error al obtener historial:', error.message);
    res.status(500).json({ error: 'Error consultando historial' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servicio escuchando en http://localhost:${PORT}`);
});
