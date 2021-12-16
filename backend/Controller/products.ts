import * as bodyParser from 'body-parser'
import * as paginate from 'express-paginate'
import dataset from '../dataset'
import * as express from 'express'

const serverless = require('serverless-http')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(paginate.middleware(100, 100))

app.use((req, res, next) => {
  // set default or minimum is 10 (as it was prior to v0.2.0)
  if (req.query.limit <= 100) req.query.limit = 100
  next()
})

//  function for getting all products
app.get('/', async (req, res) => {
  let dataset = req.app.get('dataset')

  const {
    limit,
    page
  } = req.query

  const pageCount = Math.ceil(dataset.length / limit)

  if (page === 1) { dataset = dataset.slice(0, limit) } else { dataset = dataset.slice((page - 1) * limit, page * limit) }

  return res.status(200).send({
    data: dataset,
    ...(page > 1 ? { previous: page - 1 } : {}),
    ...(paginate.hasNextPages(req)(pageCount) === true ? { next: page + 1 } : {})
  })
})

// module.exports.handler = serverless(app)

const handler = serverless(app)
module.exports.handler = async (event, context) => {
  const datasetResult = await dataset()
  app.set('dataset', datasetResult)

  // you can do other things here
  const result = await handler(event, context)
  // and here
  return result
}
