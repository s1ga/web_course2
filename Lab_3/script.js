const body = document.querySelector('body')

//module pattern
const module = (function() {

    const table = document.querySelector('#module__table')

    //array of objects
    let studentArr = [
        {
            name: "Sergey",
            surname: "Harlanov",
            age: 18,
            mark: 8
        },
        {
            name: "Sergey",
            surname: "Harlanov",
            age: 18,
            mark: 7
        },
        {
            name: "Sergey",
            surname: "Harlanov",
            age: 18,
            mark: 8
        },
        {
            name: "Jan",
            surname: "Jasker",
            age: 18,
            mark: 10
        },
        {
            name: "Vlad",
            surname: "Kochurko",
            age: 18,
            mark: 8
        },
        {
            name: "Vlad",
            surname: "Mironchuk",
            age: 19,
            mark: 7
        }
    ]

    //length of array
    let arrLength = studentArr.length

    //array of object keys
    const keys = [...Object.keys(studentArr[0]), 'action']

    //get object value
    const getValue = (i, j) => Object.values(studentArr[i])[j]

    //create button
    const createButton = (btn, text, className, id) => {
        btn.innerText = text
        btn.classList.add(className)
        btn.dataset.id = id
        return btn
    }

    return {
        appendTable: () => {
            //crate table element
            // const table = body.appendChild(document.createElement('table'))
            for (let i = 0; i <= arrLength; i++) {
                //for each object create tr element
                const tr = document.createElement('tr')
                table.appendChild(tr)
                if (i === 0) {
                    //for each object key create table header element with content
                    for (let j = 0; j < keys.length; j++) {
                        const th = document.createElement('th')
                        tr.appendChild(th)
                        th.innerText = keys[j].toUpperCase()
                    }
                } else {
                    //for each object value create td with content
                    for (let j = 0; j < keys.length; j++) {
                        const td = document.createElement('td')
                        if (keys[j] === 'mark') {
                            td.className = 'mark'
                        } 
                        if (keys[j] === 'action') {
                            let editBtn = document.createElement('button')
                            let removeBtn = document.createElement('button')
                            tr.appendChild(td)
                            td.className = 'action'

                            editBtn = createButton(editBtn, 'Edit', 'edit__btn', i)
                            removeBtn = createButton(removeBtn, 'Remove', 'remove__btn', i)

                            td.appendChild(editBtn)
                            td.appendChild(removeBtn)
                        } else {
                            tr.appendChild(td)
                            td.innerText = getValue(i - 1, j)
                        }
                    }
                }
            }
        },
        getMark: () => {
            let sum = 0
            const marks = document.querySelectorAll('.mark')
            for (let i = 0; i < marks.length; i++) {
                const mark = +marks[i].innerText
                sum += mark
            }

            const result = sum / arrLength
            return result.toFixed(2)
        },
        appendItem: item => {
            studentArr.push(item)
            arrLength++

            const tr = document.createElement('tr')
            table.appendChild(tr)
            for (let j = 0; j < keys.length; j++) {
                const td = document.createElement('td')
                if (keys[j] === 'mark') {
                    td.className = 'mark'
                }
                if (keys[j] === 'action') {
                    let editBtn = document.createElement('button')
                    let removeBtn = document.createElement('button')
                    tr.appendChild(td)
                    td.className = 'action'

                    editBtn = createButton(editBtn, 'Edit', 'edit__btn', arrLength)
                    removeBtn = createButton(removeBtn, 'Remove', 'remove__btn', arrLength)

                    td.appendChild(editBtn)
                    td.appendChild(removeBtn)
                } else {
                    tr.appendChild(td)
                    td.innerText = getValue(arrLength - 1, j)
                }
            }
            return tr
        },
        getItem: i => studentArr[i - 1],
        removeItem: i => {
            let item = studentArr[i-1]
            studentArr.splice(i - 1, 1)
            arrLength--

            item = document.querySelectorAll('tr')[i]
            table.removeChild(item)
            for (let j = 1; j <= arrLength; j++) {
                document.querySelectorAll('tr')[j].querySelectorAll('td')[4].querySelectorAll('button').forEach(i => i.dataset.id = j)
            }
        },
        updateItem: (i, item) => {
            studentArr[i - 1] = item
            values = Object.values(item)

            for (let j = 0; j < keys.length - 1; j++) {
                document.querySelectorAll('tr')[i].querySelectorAll('td')[j].textContent = values[j]
            }
        }
    }
}() )

const appendMark = () => {
    const div = document.querySelector('.module__mark')
    div.innerText = "Average mark: " + module.getMark()
}

//making table
module.appendTable()

//show average mark
appendMark()

let removeItemBtns = document.querySelectorAll('.remove__btn')
let editItemBtns = document.querySelectorAll('.edit__btn')
const appendBtn = document.querySelector('.module__append__form__btn')
const studentName = document.querySelector('#name')
const studentSurname = document.querySelector('#surname')
const studentAge = document.querySelector('#age')
const studentMark = document.querySelector('#mark')

function removeItem() {
    const idx = this.dataset.id
    module.removeItem(idx)
    appendMark()
}

function editItem() {
    const idx = this.dataset.id
    const itm = module.getItem(idx)

    const body = {
        name: studentName.value ? studentName.value : itm.name,
        surname: studentSurname.value ? studentSurname.value : itm.surname,
        age: studentAge.value ? +studentAge.value : itm.age,
        mark: studentMark.value ? +studentMark.value : itm.mark
    }
    module.updateItem(idx, body)
    appendMark()
}

appendBtn.addEventListener('click', () => {
    const body = {
        name: studentName.value,
        surname: studentSurname.value,
        age: +studentAge.value,
        mark: +studentMark.value
    }

    const itm = module.appendItem(body)
    const itmRemoveBtn = itm.querySelector('.remove__btn')
    const itmEditBtn = itm.querySelector('.edit__btn')
    itmRemoveBtn.addEventListener('click', removeItem)
    itmEditBtn.addEventListener('click', editItem)
    appendMark()
})

removeItemBtns.forEach(i => i.addEventListener('click', removeItem))

editItemBtns.forEach(i => i.addEventListener('click', editItem))


