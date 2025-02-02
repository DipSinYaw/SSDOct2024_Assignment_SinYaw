// Convert the map to an array of entries
const mapToArray = (entries) => {
    try {
        return Array.from(entries);
    } catch (error) {
        console.error("Error converting map to array:", error);
        throw error;
    }
};

// Convert the array of entries to JSON
const arrayToJson = (array) => {
    try {
        return JSON.stringify(array);
    } catch (error) {
        console.error("Error converting array to JSON:", error);
        throw error;
    }
};

// Parse the JSON string to an array of entries
const jsonToArray = (json) => {
    try {
        return JSON.parse(json);
    } catch (error) {
        console.error("Error parsing JSON to array:", error);
        throw error;
    }
};

// Convert the array of entries back to a Map
const entriesToMap = (entriesArray) => {
    try {
        return new Map(entriesArray);
    } catch (error) {
        console.error("Error converting entries array to map:", error);
        throw error;
    }
};

module.exports = { mapToArray, arrayToJson, jsonToArray, entriesToMap };