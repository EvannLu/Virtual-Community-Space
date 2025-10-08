import { pool } from '../config/database.js'

// retrieve all locations from the database.
const getAllLocations = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM locations ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch(error){
        res.status(409).json( { error: error.message } );
    }
};

// retrieve a single location based on its unique ID. 
const getLocationsById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT * 
        FROM locations 
        WHERE id=$1
        `;

        /*
        route declares the param as :locationId, so read that value.

        NEED TO BE CONSISTENT WITH THE ROUTE DEFINITION IN routes/locations.js:
            router.get('/:locationId', locationsController.getLocationsById)
        */
        const locationId = req.params.locationId;

        const results = await pool.query(selectQuery, [locationId]);

        // If no rows were returned, send a 404
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'location not found' });
        }

        // return the first (and only) matching location
        return res.status(200).json(results.rows[0]);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};


export default {
    getAllLocations,
    getLocationsById
};