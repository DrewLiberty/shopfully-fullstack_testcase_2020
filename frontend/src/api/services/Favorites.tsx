class Favorite {
  constructor (public identifier: number, public title: string) {}
}

function getAll (): Array<Favorite> {
  let items = JSON.parse(localStorage.getItem('favorites') || '[]')
  if (!Array.isArray(items)) {
    localStorage.clear()
    localStorage.setItem('favorites', JSON.stringify([]))
    items = []
  }
  return items
}
function get (identifier: number): Favorite | undefined {
  const items = getAll().filter(el => el.identifier == identifier)
  const item = items.pop()
  return item
}
function add (identifier: number, title: string): void {
  let items = getAll()
  items.push(new Favorite(identifier, title))
  localStorage.setItem('favorites', JSON.stringify(items))
}
function remove (identifier: number): void {
  let items = getAll().filter(el => el.identifier != identifier)
  localStorage.setItem('favorites', JSON.stringify(items))
}

export { Favorite, getAll, get, add, remove }
