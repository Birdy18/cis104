"use strict"; // Code is using "use strict" to read code more efficeintly.
const PROMPT = require('readline-sync'); // Calling 'readline-sync' to open a library.

const MAX_GRADE = 8, MAX_MONTH = 9, MAX_CLASSROOM = 3; // Setting up three constants with their variables.
let continueResponse; // Setting up the 'continueResponse' as a global variable.
let currentGrade, currentClassroom, monthNum; //Setting up three constants as global variables.

/**
 * @method //
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() { // Activating the main function.
    setContinueResponse(); // Setting up continueResponse.
    while (continueResponse === 1) { //Stating that if the user punches in 1 in the question.
        setMonthNum(); //Activates the MonthNum function.
        setCurrentGrade(); //Activates the CurrentGrade function.
        setCurrentClassroom(); //Activates the CurrentClassroom function
        processPaymentCoupons(); //Processes the PaymentCoupons function.
        setContinueResponse(); //Activates the ContinueResponse function.
    } // Closes the while step.
    for (let i = 0; i < MAX_CLASSROOM; i++) { //States that once MAX_CLASSROOM is past it's limit...
        printGoodbye(); //print Goodbye in the terminal.
    } //Closes the for method.
} //Closes the main function.

main(); // Activates the main call across the code

/**
 * @method
 * @desc continueResponse mutator
 * @returns {null}
 */
function setContinueResponse() { //Activates the setContinueResponse function.
    if (continueResponse === 1 || continueResponse === 0) { //An "if" statements that sends user to a path depending on what they type
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `)); // Asks a question once the user punches in one of the two variables.
        while (continueResponse !== 0 && continueResponse !== 1) { //States that if the user punches in something other than the specified variable...
            console.log(`${continueResponse} is an incorrect value. Please try again.`); // The terminal tells the user that it's an incorrect input.
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `)); // The terminal is coded here to ask the user if they want to continue the script.
        } // Closes the while loop.
    } else { //If nothing else happens that's stated in the function
        continueResponse = 1; // States the command to one of the variables.
    } //Closes the else loop
} //Closes the function loop

/**
 * @method
 * @desc monthNum mutator
 * @returns {null}
 */
function setMonthNum() { //Activates the setMonthNum function
    if (monthNum !== null && monthNum <= MAX_MONTH) { // Stating that if monthNum does not equeal null and the monthNum is lower or equeal to the maximum month variable...
        monthNum++; // Adds one to the monthNum variable
    } else { //If nothing else happens that's stated in the function
        monthNum = 1; //This variable is set to 1.
    } //Closes the else loop
} //Closes the function method

/**
 * @method
 * @desc currentMonth mutator
 * @returns {string}
 */
function setCurrentMonth() { //Activates the setCurrentMonth function
    //How could you re-factor this method to eliminate the need for a local variable?
    let currentMonth = ''; // Sets currentMonth to a certain variable.
    switch (monthNum) { // Begins method of giving monthNum diffrent cases to the user.
        case 1: currentMonth = 'September'; // Sets the monthNum variable to September if the user punches in 1
            break; // Breaks the case method
        case 2: currentMonth = 'October'; // Sets the monthNum variable to October if the user punches in 2
            break; // Breaks the case method
        case 3: currentMonth = 'November'; // Sets the monthNum variable to November if the user punches in 3
            break; // Breaks the case method
        case 4: currentMonth = 'December'; // Sets the monthNum variable to December if the user punches in 4
            break; // Breaks the case method
        case 5: currentMonth = 'January'; // Sets the monthNum variable to January if the user punches in 5
            break; // Breaks the case method
        case 6: currentMonth = 'February'; // Sets the monthNum variable to February if the user punches in 6
            break; // Breaks the case method
        case 7: currentMonth = 'March'; // Sets the monthNum variable to March if the user punches in 7
            break; // Breaks the case method
        case 8: currentMonth = 'April'; // Sets the monthNum variable to April if the user punches in 8
            break; // Breaks the case method
        case 9: currentMonth = 'May'; // Sets the monthNum variable to May if the user punches in 9
            break; // Breaks the case method
        default: console.log(`Invalid Month`); // If user punches in another variable other than what's coded, the terminal shows an error message.
    } // Closes the switch method
    console.log(`\nCurrent Month: ${currentMonth} & ${typeof currentMonth}`); //Terminal shows the message of the two functions shown based on user input in the terminal.
    return currentMonth; //Returns to a local function.
}

/**
 * @method
 * @desc currentGrade mutator
 * @returns {null}
 */
function setCurrentGrade() { //Activates the setCurrentGrade function
    if (currentGrade !== null && currentGrade <= MAX_GRADE) { // If the currentGrade is null and it is less than or equal to the max grade...
        currentGrade++;
    } else { //Shows path that user will take if circumstances are not the in the above command
        currentGrade = 0; //This value will equal 0
    } //Closes the else method
    console.log(`\nCurrent Grade: ${currentGrade} & ${typeof currentGrade}`); //This command shows the two variables that ran through the script in the terminal
}//Closes the function loop

/**
 * @method
 * @desc currentClassroom mutator
 * @returns {null}
 */
function setCurrentClassroom() { //Sets up the setCurrentClassroom command.
    if (currentClassroom !== null && currentClassroom <= MAX_CLASSROOM) { //If the currentClassroom is not equal to null and it's less than or equal to the Max_Classroom...
        currentClassroom++;
    } else { //Shows path the user will go if the above script doesn't happen.
        currentClassroom = 1; //This variable will set to 1
    } //Closes the else loop
    console.log(`\nCurrent Classroom: ${currentClassroom} & ${typeof currentClassroom}`);//Terminal displays the text in parenthes.
}// Closes the function loop.

/**
 * @method
 * @desc Upper-grade tuition calculator utility method
 * @returns {number}
 */
function setUpperTuition() { //Sets up the setUpperTuition command.
    const BASE_TUITION = 60; //This variable is given a number of 60 everytime this variable is called.
    return BASE_TUITION * currentGrade; //Notice: no local variable needed
}//This closes the function loop

/**
 * @method
 * @desc Payment coupon utility method
 * @returns {null}
 */
function processPaymentCoupons() { //This sets up the processPaymentCoupons function
    const KDG_TUITION = 80; //This constant gives the variable 80 everytime it's called.
    while (currentGrade <= MAX_GRADE) { //This while loop states currentGrade has to be less than or equal to MAX_GRADE...
        while (currentClassroom <= MAX_CLASSROOM) { //And that currentClassroom has to be less than  or equal to MAX-CLASSROOM...
            while (monthNum <= MAX_MONTH) {//And the monthNum variable has to be than or equal to MAX_MONTH
                if (currentGrade === 0) { //And if the currentGrade equals 0
                    console.log(`\n\tThe tuition for month: ${setCurrentMonth()}, for classroom: ${currentClassroom}, of grade: ${currentGrade} is: \$${KDG_TUITION}.`); //The terminal will show this message in the terminal based on the user input
                } else { //If the user doesn't input above, this else statement activates
                    console.log(`\n\tThe tuition for month: ${setCurrentMonth()}, for classroom: ${currentClassroom}, of grade: ${currentGrade} is: \$${setUpperTuition()}.`); //If the else statement activates, the terminal will show this statement
                }//Closes the else loop
                setMonthNum();//Activates the MonthNum method
            } //Closes the while loop
            setCurrentClassroom(); //Activates the CurrentClassroom method
            setMonthNum(); //Activates the MonthNum method
        } //Closes the next-to-last while loop
        setCurrentGrade(); //Activates the CurrentGrade method
        setCurrentClassroom(); //Activates the CurrentClassroom method
    }//Closes the first while loop within the function
}//Closes the function loop

/**
 * @method
 * @desc Print goodbye utility method
 * @returns {null}
 */
function printGoodbye() { //This sets up the printGoodbye function
    console.log(`\tGoodbye.`); //The terminal will show this message
} //Closes this function loop

