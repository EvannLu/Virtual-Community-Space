import React, { useState, useEffect } from 'react'
import Event from '../components/Event'
import '../css/LocationEvents.css'
// Import the necessary API service functions (assuming getEventsByLocationId is now available)
import LocationsAPI from '../services/LocationsAPI'
import EventsAPI from '../services/EventsAPI'

// Assuming 'id' is the location ID being passed from the router
const LocationEvents = ({ id }) => { 
    const [location, setLocation] = useState(null)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            if (!id) {
                setLoading(false);
                return;
            }

            try {
                // 1. Fetch Location Details
                const locationData = await LocationsAPI.getLocationsById(id);
                setLocation(locationData);
                
                // 2. Fetch Events directly using the efficient API function
                const locationEvents = await EventsAPI.getEventsByLocationId(id);
                setEvents(locationEvents);

            } catch (error) {
                console.error("Error fetching location and events:", error);
                setLocation(null);
                setEvents([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [id]); // Depend on the ID prop

    // --- Loading and Error States ---
    if (loading) {
        return <div className='location-events'>Loading location details and events...</div>;
    }
    
    if (!location) {
        return <div className='location-events'><h2>Location not found.</h2></div>;
    }

    // --- Main Render ---
    return (
        <div className='location-events'>
            <header>
                <div className='location-image'>
                    <img src={location.image} alt={location.name} />
                </div>

                <div className='location-info'>
                    <h2>{location.name}</h2>
                    <p>{location.address}, {location.city}, {location.state} {location.zip}</p>
                </div>
            </header>

            <main>
                {
                    events && events.length > 0 ? events.map((event) =>
                        <Event
                            key={event.id}
                            id={event.id}
                            // Only passing ID
                        />
                    ) : (
                        <h2><i className="fa-regular fa-calendar-xmark fa-shake"></i> {'No events scheduled at this location yet!'}</h2>
                    )
                }
            </main>
        </div>
    )
}

export default LocationEvents;