const express = require('express');
const router = express.Router();
const clinicController = require('../controllers/clinicController');

// Route to get all services, with optional limit
router.get('/services', clinicController.getServices);

// Route to get all doctors, with optional limit
router.get('/doctors', clinicController.getDoctors);

// Route to get general clinic information
router.get('/info', clinicController.getClinicInfo);

// Route to handle contact form submissions
router.post('/contact', clinicController.handleContactSubmission);

module.exports = router;
