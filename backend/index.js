const express = require('express')
const axios = require('axios')

const app = express()
const cors = require('cors');

app.use(cors());

const PORT = process.env.PORT || 3001

app.get('/clima', async (req, res) => {
    const { lat, lon } = req.query

    try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        const response = await axios.get(url)
        res.json(response.data.current_weather) // nota: current_weather, no current_clima
    } catch (error) {
        console.error('Error al obtener el clima:', error.message)
        res.status(500).json({ error: 'Error obteniendo clima' })
    }
})

app.listen(PORT, () => {
    console.log(`Service escuchando en http://localhost:${PORT}`)
})