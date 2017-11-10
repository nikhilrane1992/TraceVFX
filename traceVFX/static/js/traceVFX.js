var traceVFXApp = angular.module("traceVFXApp", [
    'ui-notification',
    'angular-loading-bar',
]);

traceVFXApp.config(['NotificationProvider', '$httpProvider', function(NotificationProvider, $httpProvider) {

    NotificationProvider.setOptions({
        delay: 3000,
        startTop: 20,
        startRight: 10,
        verticalSpacing: 20,
        horizontalSpacing: 20,
        positionX: 'right',
        positionY: 'top'
    });

}]);


traceVFXApp.controller("traceVFXControllers", ['$scope', '$log', '$http', '$timeout', 'Notification', function($scope, $log, $http, $timeout, Notification) {
    console.log("traceVFXControllers loads");
    var notes = function() {
        $http.post('/notes/list/', {}).
        success(function(data, status, headers, config) {
            if (data.status) {
                $scope.notesDetails = data.data;
            } else {
                Notification.error(data.validation)
                window.location = data.redirect_url;
            }
        }).
        error(function(data, status, headers, config) {
            Notification.error(data)
        });
    }
    $scope.getDefault = function(){
        $scope.noteObj = {
            title: "",
            description: "",
            id: null,
            time: ""
        }
    }
    $scope.saveNote = function() {
        $http.post('/save/note/', $scope.noteObj).
        success(function(data, status, headers, config) {
            if (data.status) {
                Notification.success(data.validation);
                notes();
                $scope.getDefault();
            } else {
                Notification.error(data.validation)
            }
        }).
        error(function(data, status, headers, config) {
            Notification.error("Login invalid")
        });
    }
    $scope.deleteNote = function() {
        $http.post('/delete/note/', {id:$scope.noteObj.id}).
        success(function(data, status, headers, config) {
            if (data.status) {
                Notification.success(data.validation);
                notes();
            } else {
                Notification.error(data.validation)
            }
        }).
        error(function(data, status, headers, config) {
            Notification.error("Login invalid")
        });
    }
    $scope.updateNotes = function(noteObj) {
        $scope.noteObj = noteObj;
    }


    $scope.init =  function() {
        $scope.getDefault();
        notes();
    };

    $timeout($scope.init,1000);
}]);