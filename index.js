const jsonfile = require('jsonfile');
const moment = require('moment'); 
const simpleGit = require('simple-git'); // used to edit commit, push commit etc. 
const random = require('random');

const FILE_PATH = './data.json'; 

// const DATE = moment().format(); 

// const data = {
//     data: DATE 
// }

// get date from user 
const readline = require("readline");
const { Console } = require('console');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let xCoord = 0; 
let yCoord = 0; 
var currDate = new Date(); 
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var oriHour = currDate.getHours(); 
var oriMinute = currDate.getMinutes(); 
var oriSecond = currDate.getSeconds(); 
var oriMili = currDate.getMilliseconds(); 
var oriDate = currDate.getDate(); 
var oriMonth = months[currDate.getMonth()]; 
var oriYear = currDate.getFullYear()-1; 

// an addDays function that adds no. of days to a given date and returns the new date 
Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

console.log(`The Origin, aka the first box on the upper-left corner, shows your commits on ${oriMonth} ${oriDate}, ${oriYear}`);
rl.question("Please indicate the x-coordinate (in numbers of boxes away from the Origin): ", function(x) {
    xCoord = x; 
    //console.log(`${xCoord}, is the xCoord`);
    // get the y coordinate 
    rl.question("Please indicate the y-coordinate (in numbers of boxes away from the Origin): ", function(y) {
        yCoord = y; 
        //console.log(`${yCoord}, is the yCoord`);
        // x - number of weeks away from Origin
        // y - number of days away from Origin 
        var noOfDays = parseInt(xCoord * 7) + parseInt(yCoord); 
        var theOrigin = new Date(oriYear, currDate.getMonth(), oriDate, oriHour, oriMinute, oriSecond, oriMili);
        var commitDate = theOrigin.addDays(noOfDays); 
        console.log(`You are making a commit ${noOfDays} days away from the Origin`);
        console.log(`Hit enter to make a commit @ ${commitDate}`);

        //calls the makeSpecifiedCommit function to make the commit 
        makeSpecifiedCommit(xCoord,yCoord);
        rl.close();
    });
});

// rl.on("close", function() {
//     console.log("\nBYE BYE !!!");
//     process.exit(0);
// });
// console.log("The Origin, aka the first box on the upper-left corner, is defined to be the same date last year");
// let xCoord = prompt("Please indicate the starting point (in numbers of boxes away from the Origin): "); 
// console.log("you entered: " + xCoord);

// starting from the same date last year(the origin)
// x is the horizontal shift, # of weeks away from the origin 
// y is the vertical shift, # of days from the origin 
const makeSpecifiedCommit = (x,y) => {
    //const x = random.int(0,54); //55 weeks, length of the profile   
    //const y = random.int(0,6); // 7 days a week, width of the profile 
    if(x == undefined){
        x = 0; 
    }
    if(y == undefined){
        y = 0; 
    }

    const DATE = moment().subtract(1,'y').add(x,'w').add(y,'d').format(); 
    
    console.log("You made a commit @ " + DATE);
    const data = {
        data: DATE 
    }
    jsonfile.writeFile(FILE_PATH, data, () =>{
        simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE}).push(); 
    }); 
}

//generating random commits 
const makeRandomCommit = n => {

    if(n === 0 ){ return simpleGit().push();} //exit condition

    const x = random.int(0,54); //55 weeks, length of the profile   
    const y = random.int(0,6); // 7 days a week, width of the profile 

    const DATE = moment().subtract(1,'y').add(1,'d')
                         .add(x,'w').add(y,'d').format(); 
    console.log("You made a commit on " + DATE);
    const data = {
        data: DATE 
    }

    // create commits first before pushing them 
    // do a bind on makeCommit to achieve that ^ 
    // below is a recurison 
    jsonfile.writeFile(FILE_PATH, data, () =>{
        simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE}, 
        makeCommit.bind(this, --n)); 
    }); 
}

//makeRandomCommit(5);

//makeSpecifiedCommit(0,0); //one year ago 

//simpleGit().add() takes an list of files
// modify the date in .commit() 
// git commit --date="MON ..." 
// jsonfile.writeFile(FILE_PATH, data, () =>{
//     simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE}).push(); 
// }); 



//const DATE = moment().subtract(1,'d').format(); -> commit on a previous date 
