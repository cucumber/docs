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

  // Lunr search hits only have a ref in the hits.
  // The metadata is for looking up title and description
  // from the ref 
  const metadata = {}
  const idx = lunr(function () {
    this.ref('path')
    this.field('title')
    this.field('description')
    this.field('content')
    this.field('tags')

    documents.forEach(function (doc) {
      metadata[doc.path] = {
        title: doc.title,
        description: doc.description
      }
      this.add(doc)
    }, this)
  })

  stdout.write(JSON.stringify({
    idx: idx,
    metadata: metadata
  }))
})
