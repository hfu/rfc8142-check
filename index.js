const config = require('config')
const Parser = require('json-text-sequence').parser
const fs = require('fs')

const key = 'bdytyp'

const report = () => {
  console.log(r)
}

let r = {}
let count = 0

const parser = new Parser()
  .on('data', f => {
    count++
    if (f.properties[`${key}_code`]) {
      r[f.properties[`${key}_code`]] = f.properties[`${key}`]
    }
    if (count % 10000) report()
  })
  .on('finish', () => {
    report()
  })

fs.createReadStream(config.get('srcPath')).pipe(parser)
