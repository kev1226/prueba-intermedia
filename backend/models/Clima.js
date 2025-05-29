const mongoose = require('mongoose')

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
})

module.exports = mongoose.model('Clima', climaSchema)
