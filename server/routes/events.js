import express from 'express'
// import controllers for events
import eventsController from '../controllers/events.js'

const router = express.Router()

// define routes to get events 
router.get('/', eventsController.getAllEvents);
router.get('/:eventId', eventsController.getEventsById)

// special: route to get events by locationId
router.get('/locations/:id/events',eventsController.getEventsByLocationId)



export default router