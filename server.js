const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000; 

// Connexion à MongoDB
connectDB();

app.use(express.json());

// Route de base
app.get('/', (req, res) => {
    res.send('Serveur Express en marche');
});

// Lancement le serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
