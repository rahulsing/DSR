myApp.controller("momController2", ['$scope', 'MomService', '$routeParams', '$rootScope', '$cookies', '$location', function ($scope, MomService, $routeParams, $rootScope, $cookies, $location) {
    console.log("email : " + $cookies.get('userEmail'));
    $scope.FullName = $cookies.get('userName');

    $scope.OperType = 1; //set type of opetaion //insert/delete
    $scope.participantslist = []; //list of participants
    $scope.Tasks = []; //all the tasks of mom
    // $scope.Moms = [];//all moms
    $scope.momTasksViewModel = {};
    $scope.momTasksViewModel.MomMaster = {};
    $scope.momTasksViewModel.listTasks = {};

    //default assigned
    $scope.currentUser = '271888';

    $scope.locations = [
   { name: 'Kolkata', Title: 'Kolkata' },
   { name: 'Chennai', Title: 'Chennai' },
   { name: 'Dallas', Title: 'Dallas' }
      ];
    $scope.location = $scope.locations[0];

    $scope.categories = [
  { name: 'General', Title: 'General' },
  { name: 'Project', Title: 'Project' },
      { name: 'Account', Title: 'Account' }
      ];
    $scope.category = $scope.categories[0];

    $scope.priorities = [
 { name: 'Low', Title: 'Low' },
 { name: 'Medium', Title: 'Medium' },
     { name: 'High', Title: 'High' },
     { name: 'Critical', Title: 'Critical' }
      ];
    $scope.taskpriority = $scope.priorities[0];

    $scope.statuss = [
{ name: 'Not Started', Title: 'Not Started' },
{ name: 'In-Progress', Title: 'In-Progress' },
    { name: 'Completed', Title: 'Completed' },
    { name: 'Cancelled', Title: 'Cancelled' },
    { name: 'On-Hold', Title: 'On-Hold' }
      ];
    $scope.taskstatus = $scope.statuss[0];

    $scope.tasks = [
{ name: 'Risk', Title: 'Risk' },
{ name: 'Issue', Title: 'Issue' },
   { name: 'Task', Title: 'Task' }
      ];
    $scope.taskType = $scope.tasks[2];
    //$scope.tasks = [];

    $scope.task = null;
    $scope.Title = 'This is Test';

    $scope.logout = function () {
        console.log("logout");
        $cookies.remove('userEmail');
        $location.path("/");
    }

    //GetAllRecords();
    $scope.removeParticipants = function (value) {
        // console.log(value);
        console.log($scope.participantslist);
        var index = $scope.participantslist.indexOf(value);
        console.log(index);

        if ($scope.participantslist.indexOf(value) != -1) { console.log("No " + value); }
        //var fruits = $scope.participantslist;
        //console.log(fruits.indexOf(value));
        $scope.participantslist.splice(index, 1);
    };
    $scope.addParticipants = function () {

        //console.log($scope.participant);
        //console.log($scope.participants);
        $scope.participantslist.push($scope.participant);
        //console.log($scope.participantslist);
        //$scope.participantslist.push($scope.associateEmail);
        $scope.participant = "";
        $scope.associateEmail = "";
        console.log($scope.participantslist.length);
    };

    //UPDATE TASK
    $scope.selectTask = function (task) {
        //$scope.Tasks = task;
        console.log(task.TaskType);
        var value = task.TaskType;
        console.log($scope.tasks);
        console.log($scope.tasks.indexOf(value));
        $scope.taskType = $scope.tasks.indexOf(task.TaskType);
        $scope.taskType = task.name;
        $scope.taskproject = task.Project;
        $scope.taskassignedTo = task.AssociateId;
        $scope.taskEndDate = task.ExpectedEndDate;
        $scope.taskpriority = task.Priority;
        $scope.taskdescription = task.TaskDescription;
        $scope.taskcomment = task.Comments;
    };

    //add task
    $scope.addTask = function () {
        var Task = {
            TaskType: $scope.taskType.name,
            Project: $scope.taskproject,
            TaskDescription: $scope.taskdescription,
            AssociateId: $scope.taskassignedTo,
            ExpectedEndDate: $scope.taskEndDate,
            Status: $scope.taskstatus.name,
            Priority: $scope.taskpriority.name,
            Comments: $scope.taskcomment,
            AssignedBy: $scope.currentUser
        };
        console.log(Task);
        //$scope.Tasks.push(Task);
        $scope.Tasks.push(Task);
        //empty the model
        ClearTaskModels();


    };

    function ClearTaskModels() {
        //$scope.Tasks = [];
        $scope.taskcomment = "";
        $scope.taskpriority = $scope.priorities[0];
        $scope.taskstatus = $scope.statuss[0];
        $scope.taskEndDate = "";
        $scope.taskassignedTo = "";
        $scope.taskdescription = "";
        $scope.taskproject = "";
        $scope.taskType = $scope.tasks[2];
    }

    console.log($routeParams.momId);
    var promiseGetSingle = MomService.get($routeParams.momId);
    promiseGetSingle.then(function (pl) {
        console.log(pl);
        $scope.meetidID = pl.data.MomMaster.MeetingId;
        $scope.subject = pl.data.MomMaster.Subject;
        $scope.startDate = pl.data.MomMaster.StartDate;
        $scope.endDate = pl.data.MomMaster.EndDate;
        $scope.startTime = pl.data.MomMaster.EndTime;
        $scope.endTime = pl.data.MomMaster.EndTime;
        //$scope.participantslist = pl.data.MomMaster.Participants;
        var temp = [];
        // this will return an array with strings "1", "2", etc.
        temp = pl.data.MomMaster.Participants.split(",");
        $scope.participantslist = temp;
        $scope.Tasks = pl.data.listTasks;
        //$scope.participantslist.splice(index, 1);
        console.log($scope.participantslist);

        //  listTasks
        console.log(pl.data.listTasks);
    }, function (errorPl) {
        console.log('Some Error in Getting Details', errorPl);
    });


    $scope.Update = function () {
        var Mom = {};
        $scope.OperType = 0;
        if ($scope.OperType === 0) {
            var Mom = {
                MeetingId: $scope.meetidID,
                Subject: $scope.subject,
                StartDate: $scope.startDate,
                StartTime: $scope.startTime,
                EndDate: $scope.endDate,
                EndTime: $scope.endTime,
                Category: $scope.category.name,
                Location: $scope.location.name,
                Participants: $scope.participantslist
            };

        }
        $scope.momTasksViewModel.MomMaster = Mom;
        $scope.momTasksViewModel.listTasks = $scope.Tasks;
        console.log($scope.momTasksViewModel.MomMaster);
        console.log($scope.momTasksViewModel.listTasks);
        console.log($scope.momTasksViewModel);
        if ($scope.OperType === 0) {
            console.log('Add new record ');
            var promisePost = MomService.UpdateMom($scope.meetidID, $scope.momTasksViewModel);
            promisePost.then(function (pl) {
                console.log('New record added');
                console.log(pl.data);
                $scope.TaskId = pl.data.MeetingId;
            }
              );
        } else {
            //Edit the record              
            Task.TaskId = $scope.TaskId;
            var promisePut = MomService.put($scope.TaskId, Task);
            promisePut.then(function (pl) {
                $scope.Message = "Task Updated Successfuly";
                //GetAllRecords();
                //   ClearModels();
            }, function (err) {
                console.log("Err" + err);
            });
        }


        //        $scope.SendMom = function () {
        //            console.log('Send Mom Clicked!');
        //            var promiseGetSingle = MomService.SendMOM($routeParams.momId);
        //    promiseGetSingle.then(function (pl) {
        //        });

        $scope.SendMom = function () {
            console.log("Send Mom Clicked!");
            var promiseGetSingle = MomService.SendMOM($routeParams.momId);
            promiseGetSingle.then(function (pl) { });
        };

    };
} ]);