import { createReadStream } from 'fs'
import * as path from 'path'
import { parse } from 'csv-parse/sync'

const filePath = path.join(__dirname, '/flyers_data.csv')

const fetchDataset = async () => {
  // const originalContent = await readFileSync(
  //   path.join(__dirname, '/dataset/flyers_data.csv'),
  //   'utf8'
  // )

  // const parsedContent = parse(originalContent, {
  //   columns: true,
  //   skip_empty_lines: true
  // })

  // return parsedContent

  const readableStream = createReadStream(filePath, 'utf8')

  readableStream.on('error', function (error) {
    console.log(`error: ${error.message}`)
  })

  readableStream.on('data', (chunk) => {
    console.log(chunk)
  })
}

export default fetchDataset
