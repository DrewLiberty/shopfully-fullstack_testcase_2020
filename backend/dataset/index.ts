import { open } from 'fs/promises'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

const filePath = path.join(__dirname, '/flyers_data.csv')

const fetchDataset = async () => {
  const file = await open(filePath, 'r')
  const readableStream = file.createReadStream({ start: 0, encoding: 'utf8' })
  let result = []

  await (async function () {
    for await (const chunk of readableStream) {
      result = parse(chunk, {
        columns: true,
        skip_empty_lines: true
      })
    }
  })()

  return result
}

export default fetchDataset
