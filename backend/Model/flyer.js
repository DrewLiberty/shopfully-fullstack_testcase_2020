import * as objectMapper from 'object-mapper'
import dataset from '../dataset'

const FlyerSchema = {
  id: 'id',
  title: 'title',
  start_date: 'start_date',
  end_date: 'end_date',
  is_published: 'is_published',
  retailer: 'retailer',
  category: 'category'
}

module.exports = {
  async getAll () {
    const flyiers = await dataset()

    return flyiers.map(data => objectMapper(data, FlyerSchema))
  }
}
