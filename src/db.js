
const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('db/pokedex.sqlite', (err) => {
  if (err) {
    throw err.message
  }
  console.log('Connected to the pokedex.sqlite database.');
})

module.exports = {db}