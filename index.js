/**
 * Learning Resources:
 * 
 *    Promises: https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
 *    HTTP Status Codes: https://miro.medium.com/max/920/1*w_iicbG7L3xEQTArjHUS6g.jpeg
 * 
 */
 
/////////////
// IMPORTS //
/////////////
 
/**
 * Axios Is A NPM (Node Package Manager) Package 
 * Essentially, libraries for Javascript, like in Java or C++
 * 
 *    C++: #include <iostream>
 *    Java: import java.util.*
 * 
 * "require" imports the package into your program
 * But, the package needs to be in your package.json
 * 
 * Tells the program to save the Axios Library In The const variable: "axios"
 * Use "const" as a safe practice to know that you are never are gonna change it
 */
const axios = require('axios');
 
/**
 * 'readLine' is an NPM Library that takes input from the output screen
 * Equivalent of "Scanner" or "cin", from Java and C++, respectively
 */
const readLine = require('readline');
 
/**
 *  File System is a library that lets you write to files
 */
const fs = require('fs');
 
 
///////////////
// FUNCTIONS //
///////////////
 
/**
 * Urban Dictionary API: http://urbanscraper.herokuapp.com/
 * 
 * 3 Endpoints Total: Gonna Use 2 Of Them Today
 *    http://urbanscraper.herokuapp.com/define/${term}
 *    http://urbanscraper.herokuapp.com/search/${term}
 * 
 * params:    term - the word you want to look upon Urban Dictionary
 * return:    none
 */
function api(term, allDef) {
 
  // Use Template Literals to make your life easier :)
  let url = allDef ? `http://urbanscraper.herokuapp.com/search/${term}` : `http://urbanscraper.herokuapp.com/define/${term}`;
 
  /**
   * Using GET Request...
   * 
   * Response Structure:
   *    response.data =         "Data From API"
   *    response.status =       "Success of GET Request"
   *    response.statusText =   "Meaning Of Code"
   *    response.headers =      "Meta Data"
   *        -> All Information About Your GET Request (i.e Kind OF Request, API Requested From, Dates, API Rate Limit, etc.)
   *    response.config =       "Contain Cookies Of The API Call"
   */
  axios.get(url).then(response => {
 
      // Print the term to the output.txt file
      let t = `Term: ${term}`;
      fs.writeFile('output.txt', t, (err) => {
        if(err)
          throw err;
        console.log('Term Saved!');
      });
 
      // Print all definition(s) of the term to the output.txt file
      if(!response.data.length) { // If there is only one definition in the response
        let def = `\nDefinition: ${response.data.definition}\n`;
        fs.appendFile('output.txt', def, (err) => {
          if(err)
            throw err;
          console.log('Definition Saved!');
        });
      }
      else { // If there are multiple definitions in the response
        let def = "";
 
        for(let i = 0; i < response.data.length; i++)
        {
          def = `\nDefinition: ${response.data[i].definition}\n`;
          fs.appendFile('output.txt', def, (err) => {
            if(err)
              throw err;
            console.log('Definition Saved!');
          });
        }
      }
  }).catch(error => {
    fs.writeFile('error.txt', error, (err) => {
      if(err)
        throw err;
      console.log('Error Saved!');
    });
  });
};
 
 
///////////////
// MAIN CODE //
///////////////
 
/**
 * 'process' is the console
 * Meaning, we get our input from the console and output back to the console
 * 
 * Then, initialize The Reader or "Scanner" (like in Java)
 */
let reader = readLine.createInterface({
  input: process.stdin,
  output: process.stdout
});
 
/**
 *  Prompt The User Questions and Get Their Input
 * 
 * WORD OF CAUTION: Urban Dictionary is case sensitive! So, a capitalized word may not have a lowercase equivalent on the website.
 * That is why maybe sometimes, only the term is saved, but there are no definitions in the output.txt file
 */
reader.question("Enter The Term To Search For: ", (t) => {
  reader.question("Would You Like All Definitions Of The Term? (Y/N): ", (ans) => {
      let allDef = (ans == 'Y' || ans == 'y') ? true : false
      console.log(allDef)
      api(t, allDef); // Calls the Urban Scraper API and prints requested data to a file
    });
});
 
/* PROGRAM END */