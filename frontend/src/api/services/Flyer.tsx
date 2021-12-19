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

function call (): Promise<any> {
  return fetch('http://localhost:3000')
    .then(res => res.json())
    .then(res => {
      res.data = res.data.map((el: Object) => new Flyer(el))
      return res
    })
    .catch(err => err)
}

export { Flyer, call }
