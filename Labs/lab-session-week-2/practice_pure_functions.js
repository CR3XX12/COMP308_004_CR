// Step 5: Pure function to multiply two numbers
const product = (x, y) => x * y;

/* STEP 5
a) Is this function a pure function? Explain your answer:
Yes, product is a pure function because:
- It always produces the same output for the same input.
- It does not rely on or modify any external state.
- It has no side effects.
*/

// Test the product function
console.log(product(2, 3)); // 6
console.log(product(5, 4)); // 20
console.log(product(7, 0)); // 0

// Step 6: Function to accept a function as an argument
const funct1 = (display) => {
    display("Passing a function as argument");
};

// A) The argument of funct1 is a function.
const displayMessage = (message) => {
    console.log(message);
};

funct1(displayMessage);

// C) funct1 is not a pure function because it depends on the external function (display) passed as an argument.


// Step 7: High-order function to modify message
const showMessage = function (show) {
    return function (message) {
        show(message.toUpperCase() + "!!!");
    };
};

const display = (text) => {
    console.log(text);
};

const shout = showMessage(display);
shout("Alo policia"); 
shout("comp308 is cool");

// Step 8: Map example
const concepts = [
    "immutability",
    "pure function",
    "data transformation",
    "high order function",
    "recursion"
];

const conceptsInFP = concepts.map(
    (concept) => `${concept} in functional programming`
);
console.log(conceptsInFP);

// Step 9: Reduce example to get unique colors
const colors = ["red", "red", "green", "blue", "green"];

const uniqueColors = colors.reduce(
    (unique, color) =>
        unique.indexOf(color) !== -1 ? unique : [...unique, color],
    []
);
console.log(uniqueColors);

// Step 10: Fetch book data, summarize description and compose functions

// Fetch book data using ISBN
const getBookData = async (isbn) => {
  const apiUrl = `https://openlibrary.org/isbn/${isbn}.json`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
};

// Fetch author names based on author key
const fetchAuthorName = async (authorKey) => {
  const apiUrl = `https://openlibrary.org${authorKey}.json`;
  try {
    const response = await fetch(apiUrl);
    const authorData = await response.json();
    return authorData.name;
  } catch (error) {
    console.error("Error fetching author data:", error);
    return null;
  }
};

// Summarize description by truncating it to 200 characters
const summarizeDescription = (data) => {
  if (!data.description) {
    return "No description available."; // Handle case where description is missing
  }

  return data.description.length > 200
    ? data.description.slice(0, 200) + "..." // Truncate if longer than 200 chars
    : data.description; // If shorter than 200 chars, return as is
};

// Extract book details including title, author names, publish date, and description
const extractBookDetails = async (data) => {
  const title = data.title || "Title not available";
  const publishDate = data.publish_date || "Publish date not available";

  let authorNames = [];
  if (data.authors && Array.isArray(data.authors)) {
    for (const author of data.authors) {
      const name = await fetchAuthorName(author.key);
      if (name) {
        authorNames.push(name);
      }
    }
  }

  const summary = summarizeDescription(data);

  return {
    title,
    authorNames: authorNames.join(", ") || "Author information not available",
    publishDate,
    summary
  };
};

// Format the book details into a readable string
const formatBookDetails = async (details) => {
  return `Book Title: ${details.title}
Author: ${details.authorNames}
Published: ${details.publishDate}
Summary: ${details.summary}`;
};

// Compose function to integrate all steps into a single operation
const compose = (...fns) => (x) => 
  fns.reduceRight(async (acc, fn) => {
    if (fn.constructor.name === 'AsyncFunction') {
      return fn(await acc);
    } else {
      return fn(acc);
    }
  }, Promise.resolve(x));

// Main function to fetch, process, and display book details
const displayBookDetails = (isbn) => compose(
  formatBookDetails,
  extractBookDetails,
  getBookData
)(isbn);

// Test with an example ISBN
const isbn = "1593279507"; // Example ISBN for testing
displayBookDetails(isbn)
  .then(details => {
    console.log(details); // Display the final formatted details
  })
  .catch(error => {
    console.log("Error in composition:", error);
  });
