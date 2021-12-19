const Flyier = require('../Model/flyer')

module.exports = {
  async getAll () {
    const flyiers = await Flyier.getAll()

    return flyiers
  },
  async getPaginated (limit, page) {
    let flyiers = await this.getAll()

    const pageCount = Math.ceil(flyiers.length / limit)

    if (page === 1) {
      flyiers = flyiers.slice(0, limit)
    } else {
      flyiers = flyiers.slice((page - 1) * limit, page * limit)
    }

    return {
      data: flyiers,
      ...(page > 1 && page < pageCount
        ? { previous: page - 1 }
        : { previous: pageCount }),
      ...(page < pageCount ? { next: page + 1 } : {}),
      total: pageCount
    }
  }
}
