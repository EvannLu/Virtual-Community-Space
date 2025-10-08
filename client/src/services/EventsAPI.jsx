// Define the base URL for your events API
const API_URL = 'http://localhost:3000/api/events';

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
export const getEventsById = async (id) => {
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

/**
 * Fetches all events for a specific location ID.
 * Assumes a backend route like: GET /api/locations/:locationId/events
 * NOTE: The URL starts with '/api/locations' to match the backend router path.
 * * @param {string | number} locationId The ID of the location to fetch events for.
 * @returns {Promise<Array>} A promise that resolves to an array of event objects.
 */
export const getEventsByLocationId = async (locationId) => {
    try {
        //MAKE THE ROUTE CALL TO MATCH THE SERVER'S ROUTE DEFINITION

        //You don't really have to use "http://localhost:3000", instead /api/events/locations/${locationId}/events would also work if the frontend and backend are served from the same origin.
        
        //But for clarity and avoiding CORS issues during development, we use the full URL.

        // Construct the URL to match the server's current router definition.
        
        // The events router is mounted at /api/events and defines the path /locations/:id/events

        // so the full URL is /api/events/locations/:id/events on port 3000.
        const response = await fetch(`http://localhost:3000/api/events/locations/${locationId}/events`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching events for location ${locationId}:`, error);
        return [];
    }
};


export default {
    getAllEvents,
    getEventsById,
    getEventsByLocationId,
};