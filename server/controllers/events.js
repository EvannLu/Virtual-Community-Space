import { pool } from '../config/database.js'

// retrieve all events from the database.
const getAllEvents = async (req, res) => {
    try {
        const results = await pool.query('SELECT * FROM events ORDER BY id ASC');
        res.status(200).json(results.rows);
    } catch(error){
        res.status(409).json( { error: error.message } );
    }
};

// retrieve a single event based on its unique ID. 
const getEventsById = async (req, res) => {
    try {
        const selectQuery = `
        SELECT *
        FROM events
        WHERE id=$1
        `;
        const eventId = req.params.eventId;
        const results = await pool.query(selectQuery, [eventId]);
        res.status(200).json(results.rows[0]);
    } catch(error){
        res.status(409).json( { error: error.message} );
    }
};

//get location from event id
const getEventsByLocationId = async (req, res) => {
    try {
        const selectQuery = `
            SELECT * FROM events 
            WHERE location = $1;
        `;
        const locationId = req.params.id;
        const results = await pool.query(selectQuery, [locationId]);
        res.status(200).json(results.rows);
    } catch (error) {
        res.status(409).json({ error: error.message });
    }
};

export default {
    getAllEvents,
    getEventsById,
    getEventsByLocationId
};