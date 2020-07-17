window.addEventListener('load',bindEvents);

var buttons = document.querySelectorAll('button');

function bindEvents(){

    //here we are using let instead of var
    //var - function level scope, hosts itself at top of function, declared the var at hosting but doesnot assign value = undefined
    //let - block level scope. Doesn't host. Before initialization value is = not defined
    /*
    for(let i = 0; i<buttons.length; i++){
        //event binding
        buttons[i].addEventListener('click', printXor0);
        // buttons[i].printXor0
        // here buttons[i] is a object that calls printXor0
    }
    instead we can do is use the built in funtion of forEach in querySelector
    */

    /**** This can be done using arrow function************
    buttons.forEach(registerEvents); // we are passing a function as an argument
    //forEach will perform internal looping and will give every buttons it have and binds it with registerEvents
    */

    buttons.forEach(currentButton => currentButton.addEventListener('click',printXor0));

}
/*
function registerEvents(currentButton){
    currentButton.addEventListener('click',printXor0);
    //so it is happening like registerEvents() is called internally of forEach and it is given argument of button internally
}
*/

var  flag = false;
var count = 0;
function printXor0(){

    //this: Its a keyword which keep the address/reference of current calling object. 

    //console.log('printXor0 is called',this);
    // if(flag){
    //     this.innerText = 'X';
    //     flag = !flag;
    // }else{
    //     this.innerText = '0';
    //     flag = !flag;
    // }

    if(this.innerText.length == 0){
        count++;
        this.innerText = flag?'X':'0';
        

        if(count>4){
            //it is clear that one will win after atleast 4 number of taps
            if(gameOver()){
                // # is used to get the id
                //querySelector because we want only one object
                document.querySelector('#result').innerText = 'Game Over ' + (flag?'X':'0') + ' Wins'
            }
            else if(count == 9){
                document.querySelector('#result').innerText = 'Game Over: None wins';
            }
    

        }
        
        flag = !flag;

    }
  
}

// function isBlank(first){
//     return buttons[first].innerText.trim().length==0;
// }
const isBlank = first => first.innerText.trim().length==0;//first is a button as we are passing from allThreeBlank function
//arrow function require () if there are no arguments or more than 1 argument

const allThreeBlank = (first,second,third) => isBlank(buttons[first]) && isBlank(buttons[second]) && isBlank(buttons[third]);

function compareThree(first, second,third){
    if(!allThreeBlank(first,second,third)){
        //i.e. safe code to check whether they are blank or not

        if(buttons[first].innerText == buttons[second].innerText && buttons[first].innerText == buttons[third].innerText){
            //all values are either X or 0
            return true;
        }
    }
    return  false;
}

const gameOver = () => compareThree(0,1,2) || compareThree(3,4,5) ||compareThree(6,7,8);
