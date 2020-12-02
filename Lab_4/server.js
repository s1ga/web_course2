const express = require('express')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')


app.use(bodyParser.json())

const route = require('./router')
app.use('/api/students', route)

const clientPath = path.join(__dirname, 'public')
app.use(express.static(clientPath))

const PORT = process.env.PORT || 3300
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`)
})

