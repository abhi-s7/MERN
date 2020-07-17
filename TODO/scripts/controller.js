window.addEventListener('load', init);
var iterator; //we set it as global because it will be called again n again and it must retain the previous value
function init() {
    iterator = autoIncr();
    bindEvents();
    updateCounts();
    printTaskId();
    //when the scripts load we want the search box to hide
    document.querySelector('#searchBox').classList.add('hide');
}
function bindEvents() {
    document.querySelector('#add').addEventListener('click', addTasks);
    document.querySelector('#delete').addEventListener('click', deleteMarked);
    document.querySelector('#search').addEventListener('click', searchToggle);
    //now we want to search the text written into the text field
    //for that we have a function of keyup which will tell when the pressed key has typed and it gives the results combined
    document.querySelector('#searchTask').addEventListener('keyup', searchTaskByName);
    document.querySelector('#localSave').addEventListener('click', saveToLocal);
    document.querySelector('#loadLocal').addEventListener('click', loadLocally);
    document.querySelector('#sort').addEventListener('click', sort);

}
//it's responsibility is to hide and un hide the search box
const searchToggle = () =>
    document.querySelector('#searchBox').classList.toggle('hide');

function searchTaskByName() {
    //getting the value types
    let value = this.value; //this gives the value from keyup
    let currentTask = taskOperations.searchTasks(value);
    if (currentTask.length > 0) {
        printTable(currentTask);
    } else {
        alert("No records found..");
    }

}

function updateCounts() {
    console.log('inner update');
    document.querySelector('#total').innerText
        = taskOperations.getCount();

    document.querySelector('#mark').innerText
        = taskOperations.getMark();

    document.querySelector('#unmark').innerText
        = taskOperations.getUnmark();
}

const printTaskId = () =>
    document.querySelector('#taskid').innerText = iterator.next().value;

function addTasks() {
    console.log('add task is called');
    // var id = document.querySelector('#taskid').value;
    var id = document.querySelector('#taskid').innerText; //now it is label so cannot take value like above
    var name = document.querySelector('#taskname').value;
    var descr = document.querySelector('#taskdescr').value;

    var task = taskOperations.addTask(id, name, descr);// this way we will return back the object of the task
    //other way is to get whole array back then pass the last element of the array
    //either way we will get the object in form of array element
    // var taskArray = taskOperations.getTasks();
    // var obj = taskArray[taskArray.length-1];

    // console.log('task is ', task);
    updateCounts();
    printTaskId();
    print(task);

}

// function createIcon(className) {
function createIcon(className, fn, currentId) {

    // let image = document.createElement('img');
    // //to create the img tag dynamically
    // image.src = path;
    // image.className = 'size';
    /************Now we are using font awesome and it requires <i> tag */
    let image = document.createElement('i');
    //now we have to add multiple classes there we use classList else we used className
    image.classList.add('fa');
    image.classList.add('mr-2');//to set the margin
    image.classList.add(className);
    //we will use className as trash and edit for icons
    //above is similar to <i class="fa fa-pencil"></i>
    /************now to add feature when we hove it shows hand********** */
    image.classList.add('hand');

    /* 1.we attact the function to the image in a call back fashion
    2. We add an attribute in image of tId for the unique id purpose
    */
    image.addEventListener('click', fn);
    image.setAttribute('tId', currentId);
    return image;
}

function toggleMark() {
    var id = this.getAttribute('tId');
    // console.log('Toggle Mark call ', id);
    let iTag = this; //as i tag is current calling object and it becomes this
    //with parentNode we get to upper hierarchical element
    let tr = iTag.parentNode.parentNode;
    tr.classList.toggle('alert-danger');//to mark the red in the row

    //search in array of the marked id number
    //mark the element using the mark variable
    taskOperations.toggleMarking(id);
    //now after marking we are calling update count
    updateCounts();//this will refresh the number


}

function edit() {
    //getAttribute is used to get the value inside any attribute
    var id = this.getAttribute('tId');
    console.log('Edit Call ', id);
}

// const printTable = tasks => {
//     document.querySelector('#tasks').innerHTML = '';
//     tasks.forEach(taskObject => print(taskObject)); //this will print all the task
//     //as printTask object prints only one object 
// }

function printTable(tasks) {
    document.querySelector('#tasks').innerHTML = '';
    tasks.forEach(taskObject => print(taskObject)); //this will print all the task
    //as printTask object prints only one object 
}


function print(task) {
    document.querySelector('#taskid').value = '';
    document.querySelector('#taskname').value = '';
    document.getElementById('taskdescr').value = '';
    // document.querySelector('#taskdescr').innerText = '';
    var tbody = document.querySelector('#tasks');
    //we got the body now we will insert the row into the body
    var tr = tbody.insertRow();
    var index = 0

    /*******now we don't have to print the key which is marked so we skip it */
    for (let key in task) {
        if (key == 'isMark') {
            continue;//to skip
        }
        tr.insertCell(index).innerText = task[key];
        index++;
    }

    // **********here to add icons to the table************
    let td = tr.insertCell(index);
    // td.appendChild(createIcon('trash'));
    // td.appendChild(createIcon(config.paths.images.trash));
    // td.appendChild(createIcon(config.paths.images.edit));
    //as image name can be changed in future therefore we add it in config

    /*******just to display the icons but we want functionality on each icon */
    // td.appendChild(createIcon('fa-pencil'));
    // td.appendChild(createIcon('fa-trash'));
    /*************************************************************************** */

    /* 1. Here we are attaching the function of edit and toggleMark( because it also have to get removed once tap again)
        2. Also we attach currentId to them so as to distinguish from each other */
    td.appendChild(createIcon('fa-pencil', edit, task.id));
    td.appendChild(createIcon('fa-trash', toggleMark, task.id));
}

function deleteMarked() {
    //replace the original array with the sub-array provided by filter()
    //filter out the elements which are not isMark true
    /*
    eg. var r = [10,20,30,10,10];
    r = r.filer(e=>e!=10);
    r; => [20,30]
    */

    taskOperations.deleteTask();
    //remove all the records and reprint them with the new array
    let tasks = taskOperations.getTasks();//we get the array
    printTable(tasks);
    updateCounts();

}

function saveToLocal() {
    //as localStorage is feature of HTML5 there we have to check the browser compatibality then only we can save to local storage
    //below code gives truthy
    if (window.localStorage) {
        // localStorage.tasks = taskOperations.getTasks();
        //tasks: "[object Object],[object Object]" o/p
        //        localStorage.tasks = taskOperations.tasks;
        //o/p => tasks: "[object Object],[object Object]"
        //typeof localStorage.tasks ==> gives string


        var obj = { "tasks": taskOperations.tasks };

        /* 
        console.log(obj);
        ******************* output*************************
        {tasks: Array(2)}
            tasks: Array(2)
            0: Task {id: "1000", name: "abc", descr: "sdd", isMark: false}
            1: Task {id: "1001", name: "rus", descr: "ddd", isMark: false}
            length: 2
        */

        localStorage.tasks = JSON.stringify(obj);
        /*
        console.log(localStorage.tasks);
        ******************* output*************************
        {"tasks":[
            {"id":"1000","name":"abc","descr":"sdfsd","isMark":false},
            {"id":"1001","name":"pqr","descr":"sdfsdf","isMark":false},
            {"id":"1002","name":"rgh","descr":"sdd","isMark":false}
        ]}
        this means it have array of objects and each object represent the task
        */

        alert('Saved locally');
    } else
        alert('Your browser doesn\'t supports local Storage');

    /* when we try to add again new records after loading then it starts from 1000 id by default
        so we have to find out the last stored id then start the counter from next */
}

function loadLocally() {
    if (window.localStorage) {
        if (localStorage.tasks) {
            var obj = JSON.parse(localStorage.tasks);

            /*
            console.log('obj ', obj);
            ******************* output*************************
            obj  
            Object
            tasks: Array(3)
            0: {id: "1000", name: "abc", descr: "hello", isMark: false}
            1: {id: "1001", name: "pq", descr: "fff", isMark: false}
            2: {id: "1002", name: "xyz", descr: "sdhf", isMark: false}
            length: 3
            __proto__: Array(0)
            __proto__: Object

            */

            let tasks = obj.tasks;
            /*
            console.log('tasks ', tasks);
            ******************* output************************* 
            tasks  
            Array(3)
            0: {id: "1000", name: "abc", descr: "hello", isMark: false}
            1: {id: "1001", name: "pq", descr: "fff", isMark: false}
            2: {id: "1002", name: "xyz", descr: "sdhf", isMark: false}
            length: 3
            __proto__: Array(0)

            */

            printTable(tasks);
            taskOperations.tasks = tasks;
            updateCounts();
        } else {
            alert('No data to show');
        }
    } else {
        alert('Your browser is outdated :(');
    }
}

function sort() {
    //we have pre defined method for sorting in an array i.e. sort & localeCompare
    taskOperations.tasks.sort(
        (first, second) => first.name.localeCompare(second.name));
    printTable(taskOperations.tasks);
    updateCounts();
}

