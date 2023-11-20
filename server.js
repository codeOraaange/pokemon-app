// or app.js
const express = require('express');
const app = express();
const port = 3000; //default port
// const port = 3003;
const axios = require('axios');
const path = require('path');//new untk app.use //Express Static Middleware

app.use(express.static(path.join(__dirname, 'public'))); //Express Static Middleware, untuk menangani file statis dari direktori public

app.set('view engine', 'pug');
app.get('/', (req, res) => {
  // res.render('poke-page', { title: 'My Pokemon App' });
  res.render('poke-page');
});
app.get('/detail/:id', (req, res) => {
  const pokemon_id = req.params.id;
  res.render('detail-poke-page', { pokemon_id });
});
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port} okk`);
});

// REST API(belum implementasi ke Front End)
// //1
// Endpoint untuk mengembalikan probabilitas 50% saat menangkap Pokemon
app.post('/api/catch-pokemon', (req, res) => async () => {
  try {
    // Ambil data dari PokeAPI
    // let hardcode_id = 1;
    const pokeApiResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/1');//ini nnti ke id yg diklik di pokemon list
    const probability = Math.random() < 0.5 ? true : false;

    // Kirim respons JSON dengan hasil probabilitas dan data dari PokeAPI
    res.json({ success: probability, pokeApiData: pokeApiResponse.data });
  } catch (error) {
      // Tangani kesalahan jika ada
      console.error('Error fetching data from PokeAPI:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// //1

// //2
// Endpoint untuk melepaskan Pokemon
// let hardcode_id = 1;
app.post('/api/release-pokemon', (req, res) => {//nanti jd pakai id my pokemon api-nya, jadi bkn get random number lagi
    // Logika untuk melepaskan Pokemon
    const randomNumber = Math.floor(Math.random() * 100) + 1; // Angka acak antara 1 dan 100
    let releaseResult;
    
    if (randomNumber <= 1) return false;
    for (let i = 2; i <= Math.sqrt(randomNumber); i++) {
        if (randomNumber % i === 0) releaseResult = false;
    }
    releaseResult = true;

    // Kirim respons JSON dengan hasil pelepasan dan bilangan yang dihasilkan
    res.json({ success: releaseResult, releasedNumber: randomNumber });
});

// //2

// //3
// Endpoint untuk mengganti nama Pokemon dengan deret Fibonacci
// let hardcode_id = 1;
// let hardcode_baseName = 'Pikachu';
app.post('/api/change-pokemon-name/:baseName', (req, res) => {//id my pokemon dan baseName
  // Ambil nama depan dari parameter URL
  // const baseName = req.params.baseName;
  let baseName = 'Pikachu';//hardcode

  // Dapatkan indeks dari deret Fibonacci sesuai dengan jumlah kali pergantian nama
  const changeCount = req.query.changeCount || 0;
  if (changeCount <= 0) return 0;
  if (changeCount === 1) return 1;

  let prev = 0;
  let current = 1;

  for (let i = 2; i <= changeCount; i++) {
      const temp = current;
      current = prev + current;
      prev = temp;
  }
  let fibonacciIndex = current;

  const newName = `${baseName}-${fibonacciIndex}`;

  res.json({ newName });
});
// //3
