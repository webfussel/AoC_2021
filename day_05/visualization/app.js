const fs = require('fs')
const app = require('express')()
const {coords, highest} = require('./coords')

const pixelSize = 4

const html = fs.readFileSync('./index.html')
    .toString()
    .replace(new RegExp('%SIZE%', 'g'), `${highest * pixelSize}`)
    .replace('%COORDS%', JSON.stringify(coords))
    .replace('%PIXELSIZE%', `${pixelSize}`)
const port = 1337
app.get('/', (req,res) => {
    res.send(html)
})

app.listen(port, () => {
    console.log(`Visualization started on http://localhost:${port}`)
})