class Flyer {
  id: number
  title: string
  start_date: string
  end_date: string
  is_published: boolean
  retailer: string
  category: string

  constructor (element: any) {
    this.id = element.id
    this.title = element.title
    this.start_date = element.start_date
    this.end_date = element.end_date
    this.is_published = element.is_published
    this.retailer = element.retailer
    this.category = element.category
  }
}

const apiUrl = process.env.REACT_APP_API_URL
function call (page?: number, limit: number = 50): Promise<any> {
  let url = `${apiUrl}?published=true&expired=false&limit=${limit}`

  if (page !== undefined) url += `&page=${page}`

  return fetch(url)
    .then(res => res.json())
    .then(res => {
      res.data = res.data.map((el: Object) => new Flyer(el))
      return res
    })
    .catch(err => {
      throw err
    })
}

export { Flyer, call }
