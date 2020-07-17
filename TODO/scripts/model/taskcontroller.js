const taskOperations = {
    tasks: [],
    addTask(id, name, descr) {

        var task = new Task(id, name, descr);
        this.tasks.push(task);
        return task;//we have to return here is object

    },
    toggleMarking(id) {
        //to search in an array use .find()
        let currentTaskObject =
            this.tasks.find(taskObject => taskObject.id == id);

        currentTaskObject.isMark = !currentTaskObject.isMark;
        //i.e. we got object having same id and we complement it
    },
    // getCount: () => this.task.length,
    getCount: () => taskOperations.tasks.length,

    //as this is one line operation
    // getCount(){
    //     return this.tasks.length;
    // },
    getMark() {
        //now when toggle marking has set true to those elements that are selected
        //we will filter it
        //filte makes a sub-array of all true records
        return this.tasks.filter(
            taskObject => taskObject.isMark == true).length;
    },
    getUnmark() {
        return this.tasks.length - this.getMark();
    },
    getTasks() {
        //this returns the whole array
        return this.tasks;
    },
    searchTasks(currentValue) {
        //we have two operations for searching in filter 1. startsWith & 2. includes()
        let currentTasks = this.tasks.filter(taskObject => taskObject.name.startsWith(currentValue));
        return currentTasks; //return the subarray
    },
    deleteTask() {
        this.tasks = this.tasks.filter(taskObject =>
            !taskObject.isMark); //isMark != true is optional
    },
    updateTask() {

    }
}