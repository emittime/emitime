var myTasks = [];
var newSchedule = [];

function Task(text, duration) {
    this.text = text;
    this.duration = duration;

    this.stringify = function () {
        return this.text + ": " + this.duration;
    };
}

function findPair(aListOfTasks) {
	for(var index1 = 0; index1 < aListOfTasks.length; index1++) {
		for(var index2 = index1 + 1; index2 < aListOfTasks.length; index2++) {
			pickTask1 = aListOfTasks[index1];
			pickTask2 = aListOfTasks[index2];
			console.log(pickTask1.duration + pickTask2.duration);
			if (pickTask1.duration + pickTask2.duration == 60) {
				var newPair = [];
				newPair.push(index1);
				newPair.push(index2);
				return newPair;
			}
		}
	}
	return [];
}

function test2(){
  console.log(document.getElementById("task1").innerHTML);
}

function checkTasks() {
	// for (var i = 1; i <= 4; i++) {
	// 	var taskId = "task" + i;
	// 	var durId = "dur" + i;
  //   console.log(taskId);
  //
	// 	var taskTitle = document.getElementById(taskId).value;
	// 	var taskTime = parseInt(document.getElementById(durId).value);
	// 	console.log("task title: " + taskTitle);
	// 	console.log(taskTime);
  //
	// 	var resultPlace = document.getElementById("resultats");
	// 	var newRes = document.createElement("SPAN");
	// 	var newTask = new Task(taskTitle, taskTime);
  //
	// 	newRes.innerHTML = newTask.stringify();
	// 	resultPlace.appendChild(newRes);
  //
	// 	myTasks.push(newTask);
  //
	// }

  var totalDuration = 0;
  for (var i = 0; i < myTasks.length; i++){
    if (totalDuration%60>=0 && totalDuration/60>=1){
      newSchedule.push(new Task("break", 5));
    }
    newSchedule.push(myTasks[i]);
    totalDuration+=(parseInt(myTasks[i].duration));
  }
  console.log(newSchedule); //in schedule.html, we're going to display this onto the screen

  var finalSchedule = document.getElementById("finalSchedule");
  for (var i = 0; i < newSchedule.length; i++){
    var task_ = finalSchedule.appendChild(document.createElement('div'));
    task_.id = 'listing-' + i;
    var details = task_.appendChild(document.createElement('a'));
    details.innerHTML =  newSchedule[i].text + " will take " +  newSchedule[i].duration + " minutes.";
    //task_.id = "this task: " + newSchedule[i].text + " will take " +  newSchedule[i].duration;
    //document.write(task_.id);
    //document.write("<br>");
  }
  //document.write(document.getElementById("finalSchedule"));
  // for (var i = 0; i < newSchedule.length; i++){
  //   document.write("this task: " + newSchedule[i].text + " will take " +  newSchedule[i].duration);
  // }

  //
  //
	// var newPair = findPair(myTasks);
	// console.log(newPair);
  //
	// var sched1 = schedule(myTasks);
	// console.log(sched1);
}

function schedule(aListOfTasks) {
	var schedule = [];
	var taskCopy = aListOfTasks;
	while (taskCopy.length > 0) {
		//Try to find a pair first
		var taskPair = findPair(aListOfTasks);
		if (taskPair.length > 0) {
			schedule.push(taskCopy[taskPair[0]]);
			schedule.push(taskCopy[taskPair[1]]);
			schedule.push(new Task("break", 10));

			taskCopy.splice(taskPair[0], 1);
			taskCopy.splice(taskPair[1]-1, 1);
		}

		//If no pair, just add the first thing from the tasks
		else {
			schedule.push(taskCopy[0]);
			if (taskCopy[0].duration >= 30) {
				schedule.push(new Task("break", 5));
			}
			taskCopy.splice(0, 1);
		}
	}

	return schedule;
}
