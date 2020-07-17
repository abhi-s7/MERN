/*
here we are creating a generator function 
    that have feature of pause and continue
        yield will be used to trigger it - it is like return but it will pause the function when called
            next().value --> this will give the next yield value --> it resumes the functions
            */

function* autoIncr() {
    var counter = config.autoincrementstartvalue;
    while (true) {
        yield counter;
        counter++;
    }
}