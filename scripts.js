//init
let result = 0;
let calcLine = [];
let calcIndex = 0;

/*
Refreshes the display of the line of operations
Takes a list parameter and puts it in the "steps" div
*/
function refreshDisplay(list) {
    tempString = "";
    for (i=0;i<list.length;i++)
    {
        tempString += list[i];
    }
    document.getElementById("steps").innerHTML = tempString;
    document.getElementById("result").innerHTML = "";
}


/*
Adds the pressed number on the calculator to calcLine list
*/
function pressNum(Num1) {
    if (calcLine[calcIndex] === undefined) {                           //checks if the current index isn't undefined
        calcLine[calcIndex] = Num1.toString(10);                       //if it is just assign new value
    } else {
        calcLine[calcIndex] = calcLine[calcIndex] + Num1.toString(10); //else add selected value after existing one
    }
    refreshDisplay(calcLine);
}

/**
 * 
 * @param {string} operator -  
 */
function pressOpe(operator) {
    tempNum = 0;
    //If list[index] is not undefined and index is 0 or 1 
    if (calcLine[calcIndex] !== undefined && calcIndex === 0) { 
        calcLine.push(operator);         //Push operator
        calcIndex = 2;                   //set index to 2
        refreshDisplay(calcLine);        //refresh display
    
    //if index = 2 we do the maths and put the result in the list[0] and start over with the result as base value
    } else if (calcIndex === 2) {
        if (calcLine[2] !== undefined){ //calcline[2] must be defined and a number
            calcIndex = 1;
            tempNum = calculate(calcLine);
            calcIndex = 2;
            calcLine = [];                      //reset calcLine
            calcLine[0] = tempNum.toString(10); //add result to calcLine
            calcLine.push(operator);            //add operator to calcLine
            refreshDisplay(calcLine);           //Refresh display

        } else {                                //else we assume the user want to change operator
            calcLine[1] = operator;             //add operator to calcLine
            refreshDisplay(calcLine);           //Refresh display
        }
    }
}


//This function calculates the 2 numers in the operation
//Only works if both numbers are defined
//Works if you press "=" or another operator, in which case the two first numbers will be calculated and ready for another operation
function calculate(list) {
    if (list[2] !== undefined) { //if index 2 isn't defined we probably don't need to do maths!
        tempNum = 0;
        switch (list[1]){

            case "+":       //add
                tempNum = parseInt(list[0]) + parseInt(list[2]);
                break;

            case "-":       //substract
                tempNum = parseInt(list[0]) - parseInt(list[2]);
                break;
        
            case "/":       //divide
                tempNum = parseInt(list[0]) / parseInt(list[2]);
                break;

            case "*":       //multiply
                tempNum = parseInt(list[0]) * parseInt(list[2]);
                break;
        }
        if (calcIndex !== 1){  //Check if we want the result after "=" press or an operator press
            document.getElementById("result").innerHTML = tempNum;
        } else {
            document.getElementById("steps").innerHTML = tempNum;
        }
        return tempNum;  //PreeOpe needs tempNum as return so we send it back here
    }
}


/*
When "C" button is pressed, clear all variables and reset display
*/
function stahp() {
    result = 0;
    calcLine = [];
    calcIndex = 0;
    document.getElementById("result").innerHTML = "";
    document.getElementById("steps").innerHTML = "";

}

/**
 * Event listener for keypresses on numpad
 * Calls the function associated with the keypress
 */
document.addEventListener('keypress', (event) => {
    var name = event.key;
    switch(name) {
        case '0':
            pressNum(0);
            break;
        case '1':
            pressNum(1);
            break;
        case '2':
            pressNum(2);
            break;
        case '3':
            pressNum(3);
            break;
        case '4':
            pressNum(4);
            break;
        case '5':
            pressNum(5);
            break;
        case '6':
            pressNum(6);
            break;
        case '7':
            pressNum(7);
            break;
        case '8':
            pressNum(8);
            break;
        case '9':
            pressNum(9);
            break;
        case '+':
            pressOpe('+');
            break;
        case '-':
            pressOpe('-');
            break;
        case '*':
            pressOpe('*');
            break;
        case '/':
            pressOpe('/');
            break;
        case 'Enter':
            calculate(calcLine);
            break;
    }
    
  }, false);

  /**
   * Event listener for keydown
   * Somehow, backspace doesn't work with keypress so I had to add this one just for it
   */
document.addEventListener('keydown', (event) => {
    var name = event.key;
    if (name === "Backspace"){
        stahp();
    }
}, false);