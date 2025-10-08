import express from 'express'
// import controllers for events and locations
import eventsController from '../controllers/events.js'

const router = express.Router()

// define routes to get events and locations
router.get('/', eventsController.getAllEvents)
router.get('/:eventId', eventsController.getEventById)


export default router