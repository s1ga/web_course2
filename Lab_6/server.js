const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')

app.use(express.json({ extended: true }))
app.use(cors())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const route = require('./router')
app.use('/api/students', route)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT} port`)
})

