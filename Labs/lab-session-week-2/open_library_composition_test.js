const isbn = "1593279507";  // Example ISBN

const getBookData = async (isbn) => {
  const apiUrl = `https://openlibrary.org/isbn/${isbn}.json`;
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log("Book data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching book data:", error);
  }
};

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
  
  const extractBookDetails = async (data) => {
    const title = data.title || "Title not available";
    const publishDate = data.publish_date || "Publish date not available";
  
    let authorNames = [];
    if (data.authors && Array.isArray(data.authors)) {
      for (const author of data.authors) {
        const name = await fetchAuthorName(author.key);
        console.log("Author name:", name);
        if (name) {
          authorNames.push(name);
        }
        console.log("Author names:", authorNames);
      }
    }
  
    return {
      title,
      authorNames: authorNames.join(', ') || "Author information not available",
      publishDate
    };
  };
  
  

const formatBookDetails = async (details) => {
  return `Book Title: ${details.title}\nAuthor: ${details.authorNames}\nPublished: ${details.publishDate}`;
};

const compose = (...fns) => x => fns.reduceRight(async (acc, fn) => {
  if (fn.constructor.name === 'AsyncFunction') {
    return fn(await acc);
  } else {
    return fn(acc);
  }
}, Promise.resolve(x));

const displayBookDetails = isbn => compose(
  formatBookDetails,
  extractBookDetails,
  getBookData
)(isbn);

displayBookDetails(isbn)
  .then(details => {
    console.log(details);
  })
  .catch(error => {
    console.log("Error in composition:", error);
  });
