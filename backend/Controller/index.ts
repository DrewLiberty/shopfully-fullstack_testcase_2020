import * as bodyParser from 'body-parser'
import * as paginate from 'express-paginate'
import * as express from 'express'
import flyerService from '../Services/flyier'

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
  const { limit = 100, page = 1, published, expired } = req.query

  const _published = published === undefined ? undefined : published === 'true'
  const _expired = expired === undefined ? undefined : expired === 'true'

  return res.status(200).send(
    await flyerService.getPaginated({
      limit: Number(limit),
      page: Number(page),
      published: _published,
      expired: _expired
    })
  )
})

module.exports.handler = serverless(app)
