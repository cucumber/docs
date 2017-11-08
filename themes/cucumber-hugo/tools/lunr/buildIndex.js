const lunr = require('lunr')
const stdin = process.stdin
const stdout = process.stdout
const buffer = []

stdin.resume()
stdin.setEncoding('utf8')

stdin.on('data', function (data) {
  buffer.push(data)
})

stdin.on('end', function () {
  const documents = JSON.parse(buffer.join(''))

  const idx = lunr(function () {
    this.ref('path')
    this.field('title')
    this.field('content')
    this.field('tags')

    documents.forEach(function (doc) {
      this.add(doc)
    }, this)
  })

  stdout.write(JSON.stringify(idx))
})
