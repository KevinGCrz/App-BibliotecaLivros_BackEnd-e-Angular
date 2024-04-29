const app = angular.module('todo-app', [])

app.controller('TodoController', ($scope, $http)=>{
    $scope.title = "Biblioteca Central"

    $scope.bookName = ''
    $scope.autorName = ''
    $scope.yearBook = ''
    $scope.bookList = []

    $scope.addBook = () => {
        if(!$scope.bookName){
            return alert('Digite um titulo para o próximo livro!')
        }

        $http.post('http://localhost:5252/api/books', 
        {name: $scope.bookName, autor: $scope.autorName, year: $scope.yearBook}
        ).then(()=>{
            $scope.loadBookList()
        }, () => {
            alert("Ops, aconteceu algum erro!")
        })
    }

    $scope.deleteBook = (id) =>{
        $http.delete('http://localhost:5252/api/books' + id).then(()=>{
            $scope.loadBookList()
        })
    }

    $scope.loadBookList = async () => {
        const { data } = await $http.get('http://localhost:5252/api/books')
        $scope.bookList = data;
        $scope.$apply()
    }

    $scope.loadBookList()

})