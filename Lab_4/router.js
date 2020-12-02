const router = require('express').Router()
const fs = require('fs').promises
const path = require('path')

const filePath = path.join(__dirname, 'data', 'students.json')

const pushItem = async item => {
    let data = await fs.readFile(filePath, {encoding: 'utf8'})
    data = JSON.parse(data)
    data.push(item)
    return data
}

const updateItem = async (idx, item) => {
    let data = await fs.readFile(filePath, {encoding: 'utf8'})
    data = JSON.parse(data)
    if (data[idx]) {
        data[idx] = item
        return data
    } else {
        return null
    }
}

const removeItem = async id => {
    let data = await fs.readFile(filePath, {encoding: 'utf8'})
    data = JSON.parse(data)
    if (data[id]) {
        data.splice(id, 1)
        return data
    } else {
        return null
    }
}

router.get('/', async (req, res) => {
    try {
        const data = await fs.readFile(filePath, {encoding: 'utf8'})
        res.send(JSON.parse(data))
    } catch (e) {
        console.log(e)
        res.status(500).json('Internal Server Error')
    }
})

router.post('/', async (req, res) => {
    try {
        const students = await pushItem(req.body)
        fs.writeFile(filePath, JSON.stringify(students), {
            encoding: 'utf8',
        })
        res.status(201).send(req.body)
    } catch (e) {
        console.log(e)
        res.status(500).json('Internal Server Error')
    }
})

router.put('/:id', async (req, res) => {
    try {
        const students = await updateItem(req.params.id, req.body)
        if (!updateItem) {
            res.status(404).json('Student not found')
        }
        fs.writeFile(filePath, JSON.stringify(students), {
            encoding: 'utf8',
        })
        res.status(200).send(req.body)
    } catch (e) {
        console.log(e)
        res.status(500).json('Internal Server Error')
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const students = await removeItem(req.params.id)
        if (!removeItem) {
            res.status(404).json('Student not found')
        }
        fs.writeFile(filePath, JSON.stringify(students), {
            encoding: 'utf8',
        })
        res.status(200).json('Deleted')
    } catch (e) {
        console.log(e)
        res.status(500).json('Internal Server Error')
    }
})


module.exports = router