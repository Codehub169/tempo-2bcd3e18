const { getDb } = require('../db');

// Controller to get services
exports.getServices = (req, res) => {
    const db = getDb();
    let query = 'SELECT id, name, description, iconKey FROM services ORDER BY name ASC'; // Added iconKey and ordering
    const params = [];

    if (req.query.limit) {
        const limit = parseInt(req.query.limit, 10);
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ message: 'Invalid limit parameter. Must be a positive integer.' });
        }
        query = 'SELECT id, name, description, iconKey FROM services ORDER BY name ASC LIMIT ?'; // Ensure ordering is maintained with LIMIT
        params.push(limit);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error fetching services:', err.message);
            return res.status(500).json({ message: 'Failed to retrieve services.' });
        }
        res.json(rows);
    });
};

// Controller to get doctors
exports.getDoctors = (req, res) => {
    const db = getDb();
    let query = 'SELECT id, name, specialty, qualifications, imageUrl, bio FROM doctors ORDER BY name ASC'; // Added ordering
    const params = [];

    if (req.query.limit) {
        const limit = parseInt(req.query.limit, 10);
        if (isNaN(limit) || limit <= 0) {
            return res.status(400).json({ message: 'Invalid limit parameter. Must be a positive integer.' });
        }
        query = 'SELECT id, name, specialty, qualifications, imageUrl, bio FROM doctors ORDER BY name ASC LIMIT ?'; // Ensure ordering is maintained
        params.push(limit);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Error fetching doctors:', err.message);
            return res.status(500).json({ message: 'Failed to retrieve doctors.' });
        }
        res.json(rows);
    });
};

// Controller to get general clinic information
exports.getClinicInfo = (req, res) => {
    const db = getDb();
    // Assuming clinic info is stored with id = 1 in clinic_info table
    db.get('SELECT name, address, phone, email, hours_monday_saturday, hours_sunday, about_us_short, about_us_long, mission FROM clinic_info WHERE id = 1', (err, row) => {
        if (err) {
            console.error('Error fetching clinic info:', err.message);
            return res.status(500).json({ message: 'Failed to retrieve clinic information.' });
        }
        if (!row) {
            // Provide default fallback data if no record found, to prevent frontend breaking
            return res.status(404).json({
                name: 'VisionCare India (Default)',
                address: '123 Default Street, Default City, India',
                phone: '+91 00000 00000',
                email: 'contact@defaultclinic.com',
                hours_monday_saturday: '9 AM - 6 PM',
                hours_sunday: 'Closed',
                about_us_short: 'Default information about our clinic.',
                about_us_long: 'More detailed default information about our clinic and values.',
                mission: 'Our default mission statement.'
            });
        }
        res.json(row);
    });
};

// Controller to handle contact form submissions
exports.handleContactSubmission = (req, res) => {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Name, email, and message are required fields.' });
    }

    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format provided.' });
    }

    const db = getDb();
    const stmt = db.prepare('INSERT INTO contact_messages (name, email, subject, message, submitted_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)');
    stmt.run(name, email, subject || 'General Inquiry', message, function(err) {
        if (err) {
            console.error('Error saving contact message:', err.message);
            return res.status(500).json({ message: 'Failed to submit message. Please try again later.' });
        }
        res.status(201).json({ message: 'Message received successfully! We will get back to you shortly.', messageId: this.lastID });
    });
    stmt.finalize();
};
