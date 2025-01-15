import {halfOf, multiply} from './lib.js';
//
console.log(halfOf(84));
console.log(multiply(21, 2));

// Fetch data from the API endpoint https://api.randomuser.me/?nat=US&results=1"
fetch("https://api.randomuser.me/?nat=US&results=1")
// When the response is received, convert it to JSON
.then(res => res.json())
// Once the JSON data is available, access the "results" property of the JSON and pass it along
.then(json => json.results)
// Log the result (which is the "results" property of the JSON) to the console
.then(console.log)
// If any errors occur during the above operations, catch and log them
.catch(console.error);

const fetchDataAsync = async (url) => {
try {
const response = await fetch(url);
if (!response.ok) {
throw new Error('Error: ' + response.status);
}
const data = await response.json();
return data;
} catch (error) {
throw new Error('Error: ' + error.message);
}
};