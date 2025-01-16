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