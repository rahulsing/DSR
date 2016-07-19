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
        function getProjects() {
            ProjectService.get().then(function (response) {
                $scope.projects = response.data;
                console.log(response);
            }, function (err) {
                alert(err);
            });
        };
        //call this funcation on page load
        getProjects();
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
.controller('newDsrsController', function ($scope, DSRService, $location, $routeParams, $rootScope, $filter) {
    //$scope.showName = $routeParams.projectid;
    $scope.title = 'Project: ' + $routeParams.projectId + ' - DSR History ';
    $scope.projectId = $routeParams.projectId;
    $scope.message = "";
    console.log($routeParams.projectId);

    $scope.projects = [];
    $scope.tempindex = -1;
    $scope.ProjectPhases = [];
    $scope.selectedItem = "";
    $scope.statusdata = [{ statusId: '1', statusName: 'Green' }, { statusId: '2', statusName: 'Yellow' }, { statusId: '3', statusName: 'Red' }];
 
    $scope.selectedItem = $scope.statusdata[0].statusName;
    //alert('Selected count ID: ' + $scope.statuselect);
    $scope.onchange = function (id) {
        console.log(id);
        $scope.selectedItem =id.statusName;
    }

    //add task
    $scope.addPhase = function () {
        var projectPhase = {
            ProjectId:$scope.projectId,
            PhaseName: $scope.projectPhase,
            PlnSrtDate: $scope.projectPlnStartDate,
            PlnEndDate: $scope.projectPlnEndDate,
            ActSrtDate: $scope.projectActStartDate,
            ActEndDate: $scope.projectActEndDate,
            CompletionPer: $scope.inputCompletion,
            AuditStatus: $scope.projectAuditStatus
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
        $scope.projectPhase = projectPhase.PhaseName;
        $scope.projectPlnStartDate = projectPhase.PlnSrtDate;
        $scope.projectPlnEndDate = projectPhase.PlnEndDate;
        $scope.projectActStartDate = projectPhase.ActSrtDate;
        $scope.projectActEndDate = projectPhase.ActEndDate;
        $scope.inputCompletion = projectPhase.CompletionPer;
        $scope.projectAuditStatus = projectPhase.AuditStatus;
    };

    $scope.updatePhase = function () {
        var projectPhase = {
            PhaseName: $scope.projectPhase,
            PlnSrtDate: $scope.projectPlnStartDate,
            PlnEndDate: $scope.projectPlnEndDate,
            ActSrtDate: $scope.projectActStartDate,
            ActEndDate: $scope.projectActEndDate,
            CompletionPer: $scope.inputCompletion,
            AuditStatus: $scope.projectAuditStatus
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

    //working with activity
    $scope.Accomplishments = [];

    $scope.addAccomplishments = function () {
        //console.log(m);
        var newAccomplishments = {
            ProjectId:$scope.projectId,
            Activity: $scope.accomplishmentName,
            ActivityDate: $scope.accomplishmentDate
        }
        if ($scope.accomplishmentName.length > 0) {
            $scope.Accomplishments.push(newAccomplishments);
            console.log('$scope.Accomplishments.lenght : ' + $scope.Accomplishments.length);
            //after insert clear input content
            $scope.accomplishmentName = ""; $scope.accomplishmentDate = "";
        }
    };

    $scope.removeAccomplishment = function (accomplishment) {
        //console.log(m);
        var index = $scope.Accomplishments.indexOf(accomplishment);
        console.log('accomplishment to be removed at index : '+index);
        $scope.Accomplishments.splice(index, 1);
    };

    //this funcation will get all the section from the Last DSR will be updated to be sent\
    $scope.selected = $scope.statusdata[1]
    var dsrvm = {
        projectId: $scope.projectId,
        projectStatus: $scope.selectedItem,
        phases: $scope.ProjectPhases,
        accomplishment: $scope.Accomplishments
    };

    $scope.postDsr = function () {
        console.log(JSON.stringify(dsrvm));
        console.log('Post: dsrvm - ' + $scope.projectId);
        console.log('$scope.Accomplishments.lenght : ' + $scope.Accomplishments.length);
        
        //console.log('Post: dsrvm - ' + $scope.ProjectPhases);
        //console.log('Post: dsrvm - $scope.ProjectPhases.lenght : ' + $scope.ProjectPhases.lenght);
        //console.log('Post: dsrvm - $scope.Accomplishments.lenght : ' + $scope.Accomplishments.lenght);

        DSRService.post(dsrvm).then(function (response) {
            console.log('Post the dsr');
            $scope.message = response.data;
            $scope.message = "DSR Posted successfully";
            $location.path('/projectdsrs/' + $scope.projectId);
        }, function (err) {
            alert(err);
        })
    };


});