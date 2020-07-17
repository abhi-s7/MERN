class Task {
    constructor(id, name, descr) {
        this.id = id;
        this.name = name;
        this.descr = descr;
        this.isMark = false; //we add this to keep track of marked records
    }
}