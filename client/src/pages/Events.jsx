import React, { useState, useEffect } from 'react';
import Event from '../components/Event';
import '../css/Event.css';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAllEvents = async () => {
            try {
                const response = await fetch('/api/events');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setEvents(data);
                console.log("Fetched events:", data);
            } catch (error) {
                console.error("Error fetching all events:", error);
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
                            title={event.title}
                            date={event.date}
                            time={event.time}
                            image={event.image}
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