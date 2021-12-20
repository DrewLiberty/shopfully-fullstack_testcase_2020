import * as bodyParser from 'body-parser'
import * as paginate from 'express-paginate'
import * as express from 'express'
import * as productService from '../Services/flyier'

const serverless = require('serverless-http')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(paginate.middleware(100, 200))

app.use((req, res, next) => {
  // set default or minimum is 100 (as it was prior to v0.2.0)
  if (req.query.limit <= 100) req.query.limit = 100
  next()
})

//  function for getting all products
app.get('/', async (req, res) => {
  const {
    limit,
    page
  } = req.query

  const result = await productService.getPaginated(limit, page)

  return res.status(200).send(result)
})

module.exports.handler = serverless(app)
