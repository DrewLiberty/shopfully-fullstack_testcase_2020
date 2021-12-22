import * as objectMapper from 'object-mapper'
import dataset from '../dataset'

const flyerSchema = {
  id: 'id',
  title: 'title',
  start_date: 'start_date',
  end_date: 'end_date',
  is_published: 'is_published',
  retailer: 'retailer',
  category: 'category'
}

class Flyer {
  constructor (
    public id: number,
    public title: string,
    public start_data: string,
    public end_date: string,
    public is_published: boolean,
    public retailer: string,
    public category: string
  ) {}
}

export default {
  getAll: async function (): Promise<Array<Flyer>> {
    const flyiers = await dataset()

    return flyiers.map(data => {
      objectMapper.merge(data, flyerSchema)
      return new Flyer(
        Number(data.id),
        data.title,
        data.start_data,
        data.end_date,
        Boolean(data.is_published),
        data.retailer,
        data.category
      )
    })
  }
}
