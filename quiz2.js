/**
 *   @author Bates, Howard (hbates@northmen.org)
 *   @version 0.0.1
 *   @summary Code demonstration: Collections (Arrays) :: created: 6.13.2017
 *   @todo Nothing
 */

"use strict";
const PROMPT = require('readline-sync');//The constant calls the readline-sync library

let continueResponse;//this makes continueResponse a global variable
let numStudents;//This makes numStudents a global variable
let students = [], rewardStudents = [];//This line sets both students and rewardStudents as arrays

/**
 * @method
 * @desc The dispatch method for our program
 * @returns {null}
 */
function main() { //Sets up the scripts main function
    if (continueResponse !== 0 && continueResponse !== 1) {//This states that if this global variable doesnt equal one or zero...
        setContinueResponse();//Activates the setContinueResponse function
    }
    setNumStudents();//During the main function, setNumStudents is activated
    populateStudents();//After setNumStudents, populateStudents activates next
    while (continueResponse === 1) {//This while loop states that if the user inputs one in the continueResponse question
        determineRewardStudent();//This line activates the function determineRewardStudent
        displayRewardStudent();//This line activates the function displayRewardStudent
        setContinueResponse();//This line then activates the setContinueResponse function
    }//This closes the while loop
}//This closes the main function

main();//Main() activates everything in its function

/**
 * @method
 * @desc continueResponse mutator
 * @returns {null}
 */
function setContinueResponse() {//This line sets setContinueResponse as a function
    if (continueResponse === 1 || continueResponse === 0) {//This if statement states what will happen if the user inputs one OR zero
        continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));//This line has a variable with PROMPT.question asking the user if they want to continue
        while (continueResponse !== 0 && continueResponse !== 1) {//This while loop states what will happen if the user inputs neither a 0 or a 1
            console.log(`${continueResponse} is an incorrect value. Please try again.`);//This line is the terminal using the console.log throw you an error message
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));//This line has the variable with a number asking question if the user wants to continue
        }//This closes the while loop
    } else {//This starts an else satement
        continueResponse = 1;//If the above lines aren't inputed, the variable is set to one
    }//This closes the else statement
}//This closes the function statement

/**
 * @method
 * @desc numStudents mutator
 * @returns {null}
 */
function setNumStudents() {//This line sets up a new function called setNumStudents
    const MIN_STUDENTS = 1, MAX_STUDENTS = 34;//This line sets up two variables as a constant
    while (! numStudents || numStudents < MIN_STUDENTS || numStudents > MAX_STUDENTS) {//This while loop gives three or statements which will lead to the next line in the script
        numStudents = Number(PROMPT.question(`Please enter number of students in classroom: `));//This line shows a question in which the variable will be set as when answered
        if (isNaN(parseInt(numStudents)) || numStudents < MIN_STUDENTS || numStudents > MAX_STUDENTS) {//This if statement states that if any of the user input is not a number...
            console.log(`${numStudents} is an incorrect value. Please try again.`);//The terminal will use console.log to send an error message to the user
        }//This ends the if statement
    }//This closes the while loop
}//This ends the function

/**
 * @method
 * @desc students MD array mutator
 * @returns {null}
 */
function populateStudents() {//This line starts a new function called populateStudents
    const MIN_GRADE = 0, MAX_GRADE = 8; //These two variables are given a number everytime their called, hence being set to a constant
    for (let i = 0; i < numStudents; i++) {//This sets the i as zero and if the i is bigger than the variable, it then runs through the other arrays
        students[i] = [];//Sets the i into the student array
        console.log(`\nStudent ${i + 1}:`);//The terminal uses console.log to show the student's info of that array
        while (! students[i][0] || !/^[a-zA-Z -]{1,30}$/.test(students[i][0])) {//This line shows the qualifications of input in the last name, how many letters can be in it and what array it's being stored
            students[i][0] = PROMPT.question(`Please enter last name: `);//This line asks for a last name and set it to the student array
            if (! /^[a-zA-Z -]{1,30}$/.test(students[i][0])) {//This line states that if the user input doesn't meet the requirements
                console.log(`${students[i][0]} is invalid. Please try again.`);//The terminal will use console.log to throw an error message
            }//Closes the if statement
        }//Closes the while loop
        while (! students[i][1] || !/^[a-zA-Z -]{1,30}$/.test(students[i][1])) {//
            students[i][1] = PROMPT.question(`Please enter first name: `);
            if (! /^[a-zA-Z -]{1,30}$/.test(students[i][1])) {
                console.log(`${students[i][1]} is invalid. Please try again.`);
            }
        }
        while (! students[i][2] || !/^\d{2}\/\d{2}\/\d{4}$/.test(students[i][2])) {
            students[i][2] = PROMPT.question(`Please enter date of birth (xx/xx/xxxx): `);
            if (! /^\d{2}\/\d{2}\/\d{4}$/.test(students[i][2])) {
                console.log(`${students[i][2]} is invalid. Please try again.`);
            }
        }
        while (! students[i][3] || students[i][3] < MIN_GRADE || students[i][3] > MAX_GRADE) {
            students[i][3] = PROMPT.question(`Please enter grade level (0-8): `);
            if (students[i][3] < MIN_GRADE || students[i][3] > MAX_GRADE) {
                console.log(`${students[i][3]} is invalid. Please try again.`);
            }
        }
        while (! students[i][4] || !/^[mMfF]$/.test(students[i][4])) {
            students[i][4] = PROMPT.question(`Please enter gender (m or f): `).toLowerCase();
            if (! /^[mMfF]$/.test(students[i][4])) {
                console.log(`${students[i][4]} is invalid. Please try again.`);
            }
        }
    }
}

/**
 * @method
 * @desc rewardedStudents SD array mutator
 * @returns {null}
 */
function determineRewardStudent() {
    let rewarded = false;
    while (! rewarded) {
        rewarded = true;
        let randomStudent = Math.floor((Math.random() * students.length));
        if (rewardStudents.length > 0 && rewardStudents.length < students.length) {
            for (let student of rewardStudents) {
                if (student === randomStudent) {
                    rewarded = false;
                    break;
                }
            }
            if (rewarded) {
                rewardStudents.push(randomStudent);
                break;
            }
        } else {//
            rewardStudents = [];//This variable is set as an array
            rewardStudents.push(randomStudent);//This variable is pushing another variable
        }//This ends the else statement
    }//This ends the while loop
    console.log(rewardStudents);//This line shows the variable in the terminal
}//This ends the function

/**
 * @method
 * @desc Utility method for outputting result
 * @returns {null}
 */
function displayRewardStudent() {//This line prepares for a new function called displayRewardStudent
    console.log(`You get to reward ${students[rewardStudents[rewardStudents.length - 1]][0]} today!`);//This line is console.log showing the user how many students are being rewareded based on their arrays
}

/*
 The "Hurr Durr, Make 'em Smarter Everyday" private school has again contracted you to write software that stores the following
 information about each student: Last & first name, DoB, grade level, & gender. The software should also allow teacher to
 randomly select one (1) student per day to give a special reward. Previously selected students cannot be chosen again
 until entire class has been selected at least once.
 Topics:  Collections (single & multi-dimensional arrays), for..of loops, regular expressions (regex)
 */