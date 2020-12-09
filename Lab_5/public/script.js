const BASE_URL = '/api/students'
const module = angular.module('moduleApp', [])

module.service('moduleService', function($http) {
    this.get = () => $http.get(BASE_URL)
    this.post = body => $http.post(BASE_URL, body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
    })
    this.put = (body, idx) => $http.put(`${BASE_URL}/${idx}`, body, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
    })
    this.delete = idx => $http.delete(`${BASE_URL}/${idx}`)

    this.clear = (name, surname, age, mark) => {
        name.val('')
        surname.val('')
        age.val('')
        mark.val('')
    }
    this.validate = student => {
        if (!student.name && !student.surname) {
            return 'Name or surname are required'
        } else if (student.age < 0) {
            return 'Age must be a positive number'
        } else if (student.mark < 0) {
            return 'Mark must be positive number'
        }

        return null
    }

    this.getSum = () => {
        let sum = 0
        const marks = document.querySelectorAll('.mark')
        marks.forEach(i => sum += +i.innerText)

        return sum / marks.length
    }
})

module.controller('moduleController', ($scope, moduleService,$http) => {
    $scope.loading = true
    $scope.validate = true
    $scope.students = []

    moduleService.get().then(res => {
        res.data.concat().forEach(i => $scope.students.push(i))
        if ($scope.students.length) {
            $scope.keys = [...Object.keys($scope.students[0]), 'action']
        }

        $scope.loading = false
    })

    $scope.add = () => {
        const name = angular.element(document.querySelector('#name'))
        const surname = angular.element(document.querySelector('#surname'))
        const age = angular.element(document.querySelector('#age'))
        const mark = angular.element(document.querySelector('#mark'))

        const student = {
            name: name.val(),
            surname: surname.val(),
            age: +age.val(),
            mark: +mark.val()
        }

        $scope.validate_info = moduleService.validate(student)
        if ($scope.validate_info) {
            $scope.validate = false
            return
        }

        moduleService.post(student).then(res => {
            $scope.students.push(res.data)
            if ($scope.students.length === 1) {
                $scope.keys = [...Object.keys($scope.students[0]), 'action']
            }
        })
        moduleService.clear(name, surname, age, mark)
    }

    $scope.edit = idx => {
        $scope.validate = true

        const student = $scope.students[idx]
        const name = angular.element(document.querySelector('#name'))
        const surname = angular.element(document.querySelector('#surname'))
        const age = angular.element(document.querySelector('#age'))
        const mark = angular.element(document.querySelector('#mark'))

        const body = {
            name: name.val() ? name.val() : student.name,
            surname: surname.val() ? surname.val() : student.surname,
            age: age.val() ? +age.val() : +student.age,
            mark: mark.val() ? +mark.val() : +student.mark,
        }
        $scope.validate_info = moduleService.validate(body)
        if($scope.validate_info) {
            $scope.validate = false
            return
        }

        moduleService.put(body, idx).then(res => $scope.students[idx] = res.data)
        moduleService.clear(name, surname, age, mark)
    }

    $scope.remove = idx => {
        moduleService.delete(idx).then(res => console.log(res.data))
        $scope.students = $scope.students.filter((_, index) => index !== idx)
    }

    $scope.getMark = () => moduleService.getSum()
})

