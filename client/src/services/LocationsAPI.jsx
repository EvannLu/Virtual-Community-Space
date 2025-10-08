// Define the base URL for your locations API
const API_URL = 'http://localhost:3001/api/locations';

/**
 * Fetches all locations from the backend API.
 * @returns {Promise<Array>} A promise that resolves to an array of location objects.
 */
export const getAllLocations = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching all locations:", error);
        return [];
    }
};

/**
 * Fetches a single location by its ID.
 * @param {string | number} id The ID of the location to fetch.
 * @returns {Promise<Object | null>} A promise that resolves to the location object or null.
 */
export const getLocationById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error(`Error fetching location with ID ${id}:`, error);
        return null;
    }
};

export default {
    getAllLocations,
    getLocationById,
};