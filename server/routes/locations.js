import express from 'express'
// import controllers for locations
import locationsController from '../controllers/locations.js'

const router = express.Router()

// define routes to get locations
router.get('/', locationsController.getAllLocations)
router.get('/:locationId', locationsController.getLocationsById)


export default router