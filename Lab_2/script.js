const body = document.querySelector('body')

//module pattern
const module = (function() {

    //array of objects
    const studentArr = [
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
    const arrLength = studentArr.length

    //array of object keys
    const keys = Object.keys(studentArr[0])

    //get object value
    const getValue = (i, j) => Object.values(studentArr[i])[j]

    return {
        appendTable: () => {
            //crate table element
            const table = body.appendChild(document.createElement('table'))
            
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
                        tr.appendChild(td)
                        td.innerText = getValue(i - 1, j)
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
        }
    }
}() )

//making table
module.appendTable()    

//show average mark
const div = body.appendChild(document.createElement('div'))
div.style.marginTop = '30px'
div.innerText = "Average mark: " + module.getMark()

