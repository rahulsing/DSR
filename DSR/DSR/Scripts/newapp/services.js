//'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).service('MomService', function ($http) {
  

    //Create new record
    this.post = function (momTasksViewModel) {
        var request = $http({
            method: "post",
            url: "/api/TaskMasters/PostMomTaskMaster/",
            data: momTasksViewModel
        });
        return request;
    }

    //Get Single Records
    this.get = function (meetingid) {
        return $http.get("/api/TaskMasters/GetTaskMaster/" + meetingid);
    }

    //Get All Student
    this.getAllMoms = function () {
        return $http.get("/api/TaskMasters/GetMoms");
    }

    //Update the Record
    this.UpdateMom = function (meetingid, momTasksViewModel) {
        var request = $http({
            method: "put",
            url: "/api/TaskMasters/PutTaskMaster/" + meetingid,
            data: momTasksViewModel
        });
        return request;
    }

    //Update the Record
    this.AssociateInfo = function (associate) {
        return $http.get("/api/TaskMasters/AssociateName/" + associate);
    }


    //Update the Record
    this.SendMOM = function (meetingid) {
        return $http.get("/api/TaskMasters/SendMom/" + meetingid);
    }
    //Delete the Record
//    this.delete = function (EmployeeID) {
//        var request = $http({
//            method: "delete",
//            url: "/api/emp/DeleteEmployee/" + EmployeeID
//        });
//        return request;
//    }
}).service('LoginService', function ($http) {
    //Create new record
    this.post = function (LoginCred) {
        var request = $http({
            method: "post",
            url: "/api/Account/Post/",
            data: LoginCred
        });
        return request;
    }
}).service('ProjectService', function ($http) {

    this.get = function () {
        var request = $http({
            method: "get",
            url: "/api/Project/"
        });
        return request;
    }

    //Create new record
    this.post = function (project) {
        var request = $http({
            method: "post",
            url: "/api/Project/",
            data: project
        });
        return request;
    }
});