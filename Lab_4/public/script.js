const BASE_URL = '/api/students'

let students = []

class Students {
    static get() {
        return $.ajax({
            url: BASE_URL,
            method: 'get',
            success: async res => await res.json()
        })
    }

    static create(body) {
        return $.ajax({
            url: BASE_URL,
            method: 'post',
            data: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: async res => await res.json()
        })
    }

    static update(id, itm) {
        return $.ajax({
            url: `${BASE_URL}/${id}`,
            method: 'put',
            data: JSON.stringify(itm),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            success: async res => await res.json()
        })
    }

    static remove(id) {
        return $.ajax({
            url: `${BASE_URL}/${id}`,
            method: 'delete',
            success: async res => await res.json()
        })
    }
}

//module pattern
const module = array => (function() {
    //array of objects
    let studentArr = array
    
    //length of array
    let arrLength = studentArr.length

    //array of object keys
    const keys = [...Object.keys(studentArr[0]), 'action']

    //get object value
    const getValue = (i, j) => Object.values(studentArr[i])[j]

    //create button
    const createButton = (text, className, id) =>  $('<button>', {
            text, 
            class: className,
        }).attr('data-id', id)


    return {
        appendTable: () => {
            //crate table element
            for (let i = 0; i <= arrLength; i++) {
                //for each object create tr element
                const tr = $('<tr>')
                $('#module__table').append(tr)
                if (i === 0) {
                    //for each object key create table header element with content
                    for (let j = 0; j < keys.length; j++) {
                        tr.append($('<th>').text(keys[j].toUpperCase()))
                    }
                } else {
                    //for each object value create td with content
                    for (let j = 0; j < keys.length; j++) {
                        const td = $('<td>')
                        if (keys[j] === 'mark') {
                            td.addClass('mark')
                        } 
                        if (keys[j] === 'action') {
                            tr.append(td)
                            td.addClass('action')

                            const editBtn = createButton('Edit', 'edit__btn', i)
                            const removeBtn = createButton('Remove', 'remove__btn', i)

                            editBtn.click(editItem)
                            removeBtn.click(removeItem)

                            td.append(editBtn)
                            td.append(removeBtn)
                        } else {
                            tr.append(td)
                            td.text(getValue(i - 1, j))
                        }
                    }
                }
            }
        },
        getMark: () => {
            let sum = 0
            for (let i = 0; i < $('.mark').length; i++) {
                const mark = +$('.mark').eq(i).text()
                sum += mark
            }

            const result = sum / arrLength
            return result.toFixed(2)
        },
        appendItem: () => {
            const tr = $('<tr>')
            $('#module__table').append(tr)
            for (let j = 0; j < keys.length; j++) {
                const td = $('<td>')
                if (keys[j] === 'mark') {
                    td.addClass('mark')
                }
                if (keys[j] === 'action') {
                    tr.append(td)
                    td.addClass('action')

                    editBtn = createButton('Edit', 'edit__btn', arrLength)
                    removeBtn = createButton('Remove', 'remove__btn', arrLength)

                    td.append(editBtn)
                    td.append(removeBtn)
                } else {
                    tr.append(td)
                    td.text(getValue(arrLength - 1, j))
                }
            }
            return tr
        },
        getItem: i => studentArr[i - 1],
        removeItem: i => {
            students.splice(i - 1, 1)
            arrLength--

            $('tr').eq(i).remove()
            for (let j = 1; j <= arrLength; j++) {
                const tr = $('tr').eq(j)
                const td = tr.children('td').eq(4)
                td.children('button').attr('data-id', j)
            }
        },
        updateItem: (i, item) => {
            students[i - 1] = item
            values = Object.values(item)

            for (let j = 0; j < keys.length - 1; j++) {
                const tr = $('tr').eq(i)
                tr.children('td').eq(j).text(values[j])
            }
        }
    }   
}() )

const appendMark = stds => $('.module__mark').text(`Average mark: ${module(stds).getMark()}`)

Students.get().then(data => {
    if (!data) {
        $('.module__mark').text('There are no students!')
    }
    students = data.concat()
    //making table
    module(students).appendTable()
    //show average mark
    appendMark(students)
})

$('.module__append__form__btn').click(async () => {
    const body = {
        name: $('#name').val(),
        surname: $('#surname').val(),
        age: +$('#age').val(),
        mark: +$('#mark').val()
    }

    const createApi = await Students.create(body)
    if (!createApi) {
        return
    }
    students.push(body)
    const action = module(students).appendItem(body).children('.action')
    action.children('.remove__btn').click(removeItem)
    action.children('.edit__btn').click(editItem)
    appendMark(students)
    $('.module__append__form__input').val('')
})

$(document).keydown(e => {
    if (e.key === 'Enter') {
        $('.module__append__form__btn').click()
    }
})

async function removeItem() {
    const idx = this.dataset.id
    const removeApi = await Students.remove(idx - 1)
    console.log(removeApi)
    if (!removeApi) {
        return 
    }
    module(students).removeItem(idx)
    appendMark(students)
}

async function editItem() {
    console.log('Edit click')
    const idx = this.dataset.id
    const itm = module(students).getItem(idx)

    const body = {
        name: $('#name').val() ? $('#name').val() : itm.name,
        surname: $('#surname').val() ? $('#surname').val() : itm.surname,
        age: $('#age').val() ? +$('#age').val() : itm.age,
        mark: $('#mark').val() ? +$('#mark').val() : itm.mark
    }

    const updateApi = await Students.update(idx - 1, body)
    if (!updateApi) {
        return 
    }
    module(students).updateItem(idx, body)
    appendMark(students)
    $('.module__append__form__input').val('')
}


