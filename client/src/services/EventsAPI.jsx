// Define the base URL for your events API
const API_URL = 'http://localhost:3001/api/events';

/**
 * Fetches all events from the backend API.
 * @returns {Promise<Array>} A promise that resolves to an array of event objects.
 */

export const getAllEvents = async () => {
    try {
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            // Throw an error if the HTTP status is not 2xx
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching all events:", error);
        return []; // Return an empty array on failure
    }
};

/**
 * Fetches a single event by its ID.
 * @param {string | number} id The ID of the event to fetch.
 * @returns {Promise<Object | null>} A promise that resolves to the event object or null.
 */

export const getEventById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching event with ID ${id}:`, error);
        return null; // Return null on failure
    }
};

export default {
    getAllEvents,
    getEventById,
};