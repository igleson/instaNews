var app = angular.module('website', ['ngAnimate', 'ngTouch'])
    

app.controller('MainCtrl', function ($scope, $timeout) {
    $scope.slides = [
        {instagran: 'images/img00.jpg', rss: 'images/img04.jpg', date: '01-01-2000'},
        {instagran: 'images/img01.jpg', rss: 'images/img03.jpg', date: '02-01-2000'},
        {instagran: 'images/img02.jpg', rss: 'images/img01.jpg', date: '03-01-2000'},
        {instagran: 'images/img03.jpg', rss: 'images/img00.jpg', date: '04-01-2000'},
        {instagran: 'images/img04.jpg', rss: 'images/img01.jpg', date: '05-01-2000'}
    ]

    $scope.direction = 'left'
    $scope.currentIndex = 0

    $scope.dataMostrada = $scope.slides[$scope.currentIndex].date

    $scope.autoSlide = true
    $scope.nomeBotao = "Parar"

    $scope.autoSlideOnOff = function() {
        $scope.autoSlide = !$scope.autoSlide
        if($scope.autoSlide){
            $scope.nomeBotao = "Parar"
            slideLoop()
        } else {
            $scope.nomeBotao = "Continuar"
        }
    }

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right'
        $scope.currentIndex = index
    }

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index
    }

    $scope.prevSlide = function () {
        $scope.direction = 'left'
        $scope.currentIndex = ($scope.currentIndex + 1) % $scope.slides.length
        $scope.dataMostrada = $scope.slides[$scope.currentIndex].date
    }

    $scope.nextSlide = function () {
        $scope.direction = 'right'
        $scope.currentIndex = ($scope.currentIndex - 1) % $scope.slides.length
        $scope.dataMostrada = $scope.slides[$scope.currentIndex].date
    }

    slideLoop = function (){
        $timeout(function() {
            if ($scope.autoSlide) {
                $scope.prevSlide()
                slideLoop()
            }
        }, 1500)
    }

    slideLoop()
})

app.animation('.slide-animation', function () {
    return {
        beforeAddClass: function (element, className, done) {
            var scope = element.scope()

            if (className == 'ng-hide') {
                var finishPoint = element.parent().width()
                if(scope.direction !== 'right') {
                    finishPoint = -finishPoint
                }
                TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done })
            }
            else {
                done()
            }
        },
        removeClass: function (element, className, done) {
            var scope = element.scope()

            if (className == 'ng-hide') {
                element.removeClass('ng-hide')

                var startPoint = element.parent().width()
                if(scope.direction === 'right') {
                    startPoint = -startPoint
                }

                TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done })
            }
            else {
                done()
            }
        }
    }
})