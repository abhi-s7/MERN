window.addEventListener('load',bindEvents);
//load: tell when the page is fully loaded, it waits untill then
//then we are binding bindEvents()
function bindEvents(){
    var greetButton  = document.getElementById('bt1'); //this returns an object
    //now we will attach event dynamically
    greetButton.addEventListener('click',sayWelcome); //not 'onClick' rather 'click' is there
    //this is called "DYNAMIC EVENT BINDING" as we are binding sayWelcome() function with the greetButton
    //STATIC BINDING OF EVENTS - onClick

    document.getElementById('btClear').addEventListener('click',clearAll)
}

function sayWelcome(){
    console.log("I'm on");
    var firstName = document.getElementById('first').value;
    // var first = firstName.charAt(0).toUpperCase() + firstName.substring(1).toLowerCase(); 
    firstName = initCap(firstName);
    var lastName = document.getElementById('last').value;
    lastName = initCap(lastName);
    var result = `Welcome ${firstName} ${initCap(lastName)}`;
    
    var pTag = document.getElementById('output');
    // pTag.innerText = result;
    pTag.innerHTML = `<strong>${result}</strong>`;

}

function clearAll(){
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('first').focus(); //this focuces on the first input 
    document.getElementById('output').innerHTML='';
}

function initCap(str){
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase(); 
}