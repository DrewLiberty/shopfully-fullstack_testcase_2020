import flyerModel from '../Model/flyer'

export default {
  async getAll ({
    published,
    expired
  }: {
    published?: boolean
    expired?: boolean
  }) {
    let flyiers = await flyerModel.getAll()

    if (published !== undefined) {
      flyiers = flyiers.filter(el => el.is_published === published)
    }

    if (expired === true) {
      flyiers = flyiers.filter(el => new Date(el.end_date) >= new Date())
    }
    if (expired === false) {
      flyiers = flyiers.filter(el => new Date(el.end_date) < new Date())
    }

    return flyiers
  },
  async getPaginated ({
    limit,
    page,
    published,
    expired
  }: {
    limit: number
    page: number
    published?: boolean
    expired?: boolean
  }) {
    let flyiers = await this.getAll({
      published,
      expired
    })

    const pageCount = Math.ceil(flyiers.length / limit)

    if (page === 1) {
      flyiers = flyiers.slice(0, limit)
    } else {
      flyiers = flyiers.slice((page - 1) * limit, page * limit)
    }

    return {
      data: flyiers,
      ...(page > 1 && page < pageCount ? { previous: page - 1 } : {}),
      ...(page < pageCount ? { next: page + 1 } : {}),
      total: pageCount
    }
  }
}
