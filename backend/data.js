const { readFileSync } = require('fs')
const path = require('path')
// const parse = require('csv-parse')

const fetchDataset = async () => {
  return await readFileSync(
    path.join(__dirname, '/dataset/flyers_data.csv'),
    'utf8'
  )
}

module.exports = fetchDataset
