'use strict';
angular.module('myApp.controllers', [])
  .controller('dsrController', function ($scope, MomService, $location, $routeParams, $rootScope) {
      $scope.title = "DSR Page";
      $scope.tempindex = -1;
      $scope.ProjectPhases = [];

      //add task
      $scope.addPhase = function () {
          var projectPhase = {
              projectPhase: $scope.projectPhase,
              projectPlnStartDate: $scope.projectPlnStartDate,
              projectPlnEndDate: $scope.projectPlnEndDate,
              projectActStartDate: $scope.projectActStartDate,
              projectActEndDate: $scope.projectActEndDate,
              projectCompletion: $scope.inputCompletion,
              projectAuditStatus: $scope.projectAuditStatus
          };
          console.log(projectPhase);
          if ($scope.projectPhase.length > 0) {
              $scope.ProjectPhases.push(projectPhase);
              console.log('$scope.ProjectPhases.lenght : ' + $scope.ProjectPhases.length);

              //after insert clear input content
              $scope.clearPhaseInputs();
          }
      };

      //update comment
      //this is to select the item from table to the input
      $scope.selectPhase = function (projectPhase) {
          //hold the index of temp phase for update
          $scope.tempindex = $scope.ProjectPhases.indexOf(projectPhase);
          console.log('$scope.tempindex ' + $scope.tempindex);
          $scope.projectPhase = projectPhase.projectPhase;
          $scope.projectPlnStartDate = projectPhase.projectPlnStartDate;
          $scope.projectPlnEndDate = projectPhase.projectPlnEndDate;
          $scope.projectActStartDate = projectPhase.projectActStartDate;
          $scope.projectActEndDate = projectPhase.projectActEndDate;
          $scope.inputCompletion = projectPhase.projectCompletion;
          $scope.projectAuditStatus = projectPhase.projectAuditStatus;
      };

      $scope.updatePhase = function () {
          var projectPhase = {
              projectPhase: $scope.projectPhase,
              projectPlnStartDate: $scope.projectPlnStartDate,
              projectPlnEndDate: $scope.projectPlnEndDate,
              projectActStartDate: $scope.projectActStartDate,
              projectActEndDate: $scope.projectActEndDate,
              projectCompletion: $scope.inputCompletion,
              projectAuditStatus: $scope.projectAuditStatus
          };
          console.log('$scope.tempindex' + $scope.tempindex);
          $scope.ProjectPhases[$scope.tempindex] = projectPhase;
          //after udpate clear input content
          $scope.clearPhaseInputs();

      };

      $scope.removePhase = function (projectPhase) {
          //console.log(m);
          var index = $scope.ProjectPhases.indexOf(projectPhase);
          console.log(index);
          $scope.ProjectPhases.splice(index, 1);
      };

      //clear the phase input text box
      $scope.clearPhaseInputs = function () {
          $scope.projectPhase = ""; $scope.projectPlnStartDate = ""; $scope.projectPlnEndDate = ""; $scope.projectActStartDate = ""; $scope.projectActEndDate = "";
          $scope.inputCompletion = ""; $scope.projectAuditStatus = "";
      };
  })
    //
    .controller('dsrProjectController', function ($scope, ProjectService, $location, $routeParams, $rootScope) {
        $scope.title = "DSR Project Page";
        $scope.tempindex = -1;
        $scope.DsrProject = [];

        //$scope.DsrProject = [
        //    {
        //        projectId: '1',
        //        projectName: 'GS1 Databar',
        //        projectStatus: 'Green',
        //        projectPlnStartDate: '07/24/2016',
        //        projectPlnEndDate: '07/24/2016',
        //        projectActStartDate: '07/24/2016',
        //        projectActEndDate: '07/24/2016',
        //        projectPM: 'Rahul',
        //        projectDSRLastDate: '07/24/2016'
        //    },
        //{
        //    projectId: '2',
        //    projectName: 'WIR',
        //    projectStatus: 'Yellow',
        //    projectPlnStartDate: '07/24/2016',
        //    projectPlnEndDate: '07/24/2016',
        //    projectActStartDate: '07/24/2016',
        //    projectActEndDate: '07/24/2016',
        //    projectPM: 'Rahul',
        //    projectDSRLastDate: '07/24/2016'
        //}
        //];

        $scope.projects = [];
        function getProducts() {
            ProjectService.get().then(function (response) {
                $scope.projects = response.data;
                console.log(response);
            }, function (err) {
                alert(err);
            });
        };
        //call this funcation on page load
        getProducts();
        console.log($scope.projects.length);

        //add project 
        $scope.addPjoject = function () {
            var project = {
                ProjectName: $scope.projectName,
                PlnSrtDate: $scope.projectPlnStartDate,
                PlnEndDate: $scope.projectPlnEndDate,
                ActSrtDate: $scope.projectActStartDate,
                ActEndDate: $scope.projectActEndDate,
                ProjectDL: $scope.projectDL,
                PM: $scope.projecPM
            };
            ProjectService.post(project).then(function (response) {
                $scope.projects = response.data;
            }, function (err) {
                alert(err);
            });
        };


    })

.controller('projectDsrsController', function ($scope, ProjectService, $location, $routeParams, $rootScope, $filter) {
    //$scope.showName = $routeParams.projectid;
    $scope.title = 'Project: ' + $routeParams.projectId + ' - DSR History ';
    $scope.projectId = $routeParams.projectId;

    $scope.DsrProject = {
        projectId: 1, projectName: 'GS1 Databar', "dsrList": [
        { dsrId: '1', projectStatus: 'Green', dsrSentby: 'Rahul', projectDSRLastDate: '07/24/2016' },
        { dsrId: '2', projectStatus: 'Yellow', dsrSentby: 'Rahul', projectDSRLastDate: '07/25/2016' },
        { dsrId: '3', projectStatus: 'Green', dsrSentby: 'Rahul', projectDSRLastDate: '07/26/2016' }
        ]
    };
    console.log($routeParams.projectId);
    //var ProjectDSRS = $filter('filter')($scope.DsrProject, { projectId: $routeParams.projectId });
    $scope.title = $scope.DsrProject.projectName;
    console.log($scope.DsrProject.projectName);
  
})
    //this controller is to manage new dsr operation
.controller('newDsrsController', function ($scope, ProjectService, $location, $routeParams, $rootScope, $filter) {
    //$scope.showName = $routeParams.projectid;
    $scope.title = 'Project: ' + $routeParams.projectId + ' - DSR History ';
    $scope.projectId = $routeParams.projectId;
    console.log($routeParams.projectId);
});