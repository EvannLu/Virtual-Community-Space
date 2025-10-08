import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import '../css/Event.css';
// 1. Import the API service
import EventsAPI from '../services/EventsAPI'

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                // Use the imported API function
                const data = await EventsAPI.getAllEvents(); 
                setEvents(data);
                console.log("Fetched events:", data);
            } catch (error) {
                // The API function already logs the error, but we can catch it here too
                console.error("Failed to load events in component:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAllEvents();
    }, []); 

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div className="events-page">
            <h1>All Events</h1>
            <main className="events-grid">
                {events.length > 0 ? (
                    events.map(event => (

                        <Event
                            key={event.id}
                            id={event.id}
                        />
                    ))
                ) : (
                    <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> No events found.</h2>
                )}
            </main>
        </div>
    );
};

export default EventsPage;