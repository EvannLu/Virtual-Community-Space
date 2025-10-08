import { pool } from './database.js';
import { eventData, locationData } from '../data/events.js';
// Assuming you have an './dotenv.js' file or equivalent for loading environment variables
import './dotenv.js'; 


// ---------------------------------------------------------------------
// Create the locations table
// ---------------------------------------------------------------------
const createLocationsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS locations CASCADE;

        CREATE TABLE IF NOT EXISTS locations (
            id INT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address TEXT,
            city VARCHAR(100),
            state VARCHAR(2),
            zip VARCHAR(10),
            image VARCHAR(255)
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('✅ locations table created successfully');
    } catch (err) {
        console.error('❌ Error creating locations table:', err);
        throw err;
    }
}

// ---------------------------------------------------------------------
// Create the events table
// ---------------------------------------------------------------------
const createEventsTable = async () => {
    const createTableQuery = `
        DROP TABLE IF EXISTS events;

        CREATE TABLE IF NOT EXISTS events (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            date VARCHAR(255) NOT NULL,
            time VARCHAR(10) NOT NULL,
            location INT REFERENCES locations(id) ON DELETE SET NULL,
            image VARCHAR(255) NOT NULL,
            remaining JSONB
        );
    `;

    try {
        await pool.query(createTableQuery);
        console.log('✅ events table created successfully');
    } catch (err) {
        console.error('❌ Error creating events table:', err);
        throw err;
    }
}

// ---------------------------------------------------------------------
// Load the data into the tables (Transactional Seeding)
// ---------------------------------------------------------------------
const seedTables = async () => {
    // Acquire a client for transaction management
    const client = await pool.connect(); 

    try {
        console.log('🌱 Starting database transaction...');
        await client.query('BEGIN'); // Start transaction

        // 1. Seed Locations Data
        for (const location of locationData) {
            const insertQuery = {
                text: 'INSERT INTO locations (id, name, address, city, state, zip, image) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                values: [location.id, location.name, location.address, location.city, location.state, location.zip, location.image],
            };
            await client.query(insertQuery);
            console.log(`✅ queued location: ${location.name}`);
        }

        // 2. Seed Events Data
        for (const event of eventData) {
            const insertQuery = {
                // Note: ID is excluded here because the events table uses SERIAL PRIMARY KEY, 
                // but the mock data is inserting all other fields.
                // We'll insert the ID explicitly here to match the mock data's ID sequence (using $1 for ID)
                text: 'INSERT INTO events (id, title, date, time, location, image, remaining) VALUES ($1, $2, $3, $4, $5, $6, $7)',
                values: [
                    event.id, // Explicitly insert ID from mock data
                    event.title, 
                    event.date, 
                    event.time, 
                    event.location, 
                    event.image, 
                    event.remaining
                ],
            };
            await client.query(insertQuery);
            console.log(`✅ queued event: ${event.title}`);
        }
        
        // After manually inserting IDs, reset the sequence to the highest ID + 1 to prevent conflicts
        await client.query(`SELECT setval('events_id_seq', (SELECT MAX(id) FROM events), true)`);


        await client.query('COMMIT'); // Commit if all insertions succeeded
        console.log('✔️ Transaction committed successfully.');

    } catch (err) {
        await client.query('ROLLBACK'); // Rollback if any error occurred
        console.error('❌ Transaction failed. Rolling back all changes.', err);
        throw err;
    } finally {
        client.release(); // Release the client back to the pool
        console.log(' Client released.');
    }
};

// ---------------------------------------------------------------------
// Main execution function
// ---------------------------------------------------------------------
const setupAndSeed = async () => {
    try {
        // Sequentially create tables, then seed the data
        await createLocationsTable();
        await createEventsTable();
        await seedTables();
        console.log('Database setup complete! 🎉');
    } catch (err) {
        console.error('Final database setup failed.');
        process.exit(1);
    }   
}

// Call the main function at the end of the file
setupAndSeed();