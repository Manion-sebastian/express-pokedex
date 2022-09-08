const express = require('express');
const db = require('../models');
const router = express.Router();
const axios = require('axios')

// GET /pokemon - return a page with favorited Pokemon
router.get('/', async (req, res) => {
  try {
    const pokeFaves = await db.pokemon.findAll()
    res.render('./pokemon/index.ejs', {pokeFaves})
  } catch(err) {
    console.log(err)
    res.send('Faves Error')
  }
})

router.post('/', async (req,res) => {
  try {
    await db.pokemon.create(req.body)
    res.redirect('/pokemon')
  } catch(err) {
    console.warn(err)
    res.send('error')
  }
})

router.get('/details', async (req,res) => {
 console.log(req.query)
  // res.render('./pokemon/details')
  const url = `https://pokeapi.co/api/v2/pokemon/${req.query.name}`
  axios.get(url)
    .then(response => {

      // console.log(response.data.height)
      console.log(response.data.sprites)
      res.render('./pokemon/details', {pokemon : response.data})
    })
})


module.exports = router;
