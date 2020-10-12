let arr = []
let button = document.getElementById('accept')
let num = document.querySelector('input')
let answers = document.getElementById('answers')

button.addEventListener('click', () => {
    if (num.value) {
        console.log(num.value)
        arr.push(+num.value)
        num.value = ""
    } else {
        sort(arr)
        getMax(arr)
        getMin(arr)
        getSum(arr)
    }
})

function sort(arr) { 
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j+1] < arr[j]) {
                let temp = arr[j+1]
                arr[j+1] = arr[j]
                arr[j] = temp
            }
        }
    }

    console.log("Sort array: ", arr)
    getAnswer(arr, 'Sort')
}

function getMin(arr) {
    let min = arr[0]
    for(let i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i]
        }
    }

    console.log("Min: ", min)
    getAnswer(min, 'Min')
}

function getMax(arr) {
    let max = arr[0]
    for(let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i]
        }
    }

    console.log("Max: ", max)
    getAnswer(max, 'Max')
}

function getSum(arr) {
    let sum = 0
    for(let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }

    console.log("Sum: ", sum)
    getAnswer(sum, 'Sum')
}

function getAnswer(value, type) {
    let answer = document.createElement('div')
    answer.style.marginBottom = '5px'
    answer.innerText = `${type}: ${value}` 
    if (type === 'Sum') {
        answer.style.borderBottom = 'solid 1px #000'
    }
    answers.append(answer)
}
