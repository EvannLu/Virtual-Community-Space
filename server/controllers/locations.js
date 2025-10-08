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
const getLocationById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT * 
        FROM locations 
        WHERE id=$1
        `;
        const locationId = req.params.id;
        const results = await pool.query(selectQuery, [locationId]);
        res.status(200).json(results.rows[0]);
        if (results.rows.length === 0) {
            return res.status(404).json({ error: 'location not found' });
        };
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};


export default {
    getAllLocations,
    getLocationById
};