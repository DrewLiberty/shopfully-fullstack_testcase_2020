import * as bodyParser from 'body-parser'
import * as paginate from 'express-paginate'
import dataset from '../dataset'
import * as express from 'express'

const serverless = require('serverless-http')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.set('dataset', dataset())

app.use(paginate.middleware(10, 50))

//  function for getting all products
app.get('/', async (req, res) => {
  try {
    return res.status(200).send(req.app.get('dataset'))
  } catch (error) {
    //  handle errors here
    console.log(error, 'error!!')
  }
})

module.exports.handler = serverless(app)
