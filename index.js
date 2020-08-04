const jsonfile = require('jsonfile');
const moment = require('moment'); 
const simpleGit = require('simple-git'); // used to edit commit, push commit etc. 
const random = require('random');

const FILE_PATH = './data.json'; 

// const DATE = moment().format(); 

// const data = {
//     data: DATE 
// }

// const makeCommit = (x,y) => {
//     const x = random.int(0,54); //55 weeks, length of the profile   
//     const y = random.int(0,6); // 7 days a week, width of the profile 

//     const DATE = moment().subtract(1,'y').add(1,'d')
//                          .add(x,'w').add(y,'d').format(); 
//     const data = {
//         data: DATE 
//     }
//     jsonfile.writeFile(FILE_PATH, data, () =>{
//         simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE}).push(); 
//     }); 
// }

//generating random commits 
const makeRandomCommit = n => {

    if(n === 0 ){ return simpleGit().push();} //exit condition

    const x = random.int(0,54); //55 weeks, length of the profile   
    const y = random.int(0,6); // 7 days a week, width of the profile 

    const DATE = moment().subtract(1,'y').add(1,'d')
                         .add(x,'w').add(y,'d').format(); 
    console.log(DATE);
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

makeRandomCommit(5);

//simpleGit().add() takes an list of files
// modify the date in .commit() 
// git commit --date="MON ..." 
// jsonfile.writeFile(FILE_PATH, data, () =>{
//     simpleGit().add([FILE_PATH]).commit(DATE, {'--date': DATE}).push(); 
// }); 



//const DATE = moment().subtract(1,'d').format(); -> commit on a previous date 
