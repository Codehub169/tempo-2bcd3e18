const { getDb } = require('../db');

// Controller to handle appointment submission
exports.submitAppointment = (req, res) => {
    const {
        patientName,
        email: patientEmail, // Renamed from formData in client
        phone: patientPhone, // Renamed from formData in client
        service: serviceName, // Renamed from formData in client
        preferredDoctor: doctorName,  // Renamed from formData in client
        preferredDate: appointmentDate, // Renamed from formData in client
        preferredTime: appointmentTime, // Renamed from formData in client
        reason
    } = req.body;

    // Basic validation
    if (!patientName || !patientEmail || !patientPhone || !serviceName || !appointmentDate || !appointmentTime) {
        return res.status(400).json({ message: 'Missing required fields. Please fill in all mandatory details.' });
    }

    // Basic email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!emailRegex.test(patientEmail)) {
        return res.status(400).json({ message: 'Invalid email format.' });
    }

    // Indian phone validation (10 digits starting with 7,8,9, optional +91)
    const phoneRegex = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    if (!phoneRegex.test(patientPhone.replace(/\s+/g, ''))) { // Remove spaces before testing
        return res.status(400).json({ message: 'Invalid phone number format. Please enter a valid 10-digit Indian mobile number.' });
    }

    const db = getDb();
    const stmt = db.prepare(`
        INSERT INTO appointments (patient_name, patient_email, patient_phone, service_name, doctor_name, appointment_date, appointment_time, reason, status, submitted_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'Pending', CURRENT_TIMESTAMP)
    `);

    stmt.run(patientName, patientEmail, patientPhone, serviceName, doctorName || null, appointmentDate, appointmentTime, reason || null, function(err) {
        if (err) {
            console.error('Error submitting appointment:', err.message);
            return res.status(500).json({ message: 'Failed to submit appointment. Please try again later.' });
        }
        res.status(201).json({ message: 'Appointment request submitted successfully!', appointmentId: this.lastID });
    });
    stmt.finalize();
};

// Controller to get all appointments (for potential admin use)
exports.getAllAppointments = (req, res) => {
    const db = getDb();
    db.all('SELECT id, patient_name, patient_email, patient_phone, service_name, doctor_name, appointment_date, appointment_time, reason, status, submitted_at FROM appointments ORDER BY submitted_at DESC', [], (err, rows) => {
        if (err) {
            console.error('Error fetching appointments:', err.message);
            return res.status(500).json({ message: 'Failed to retrieve appointments.' });
        }
        res.status(200).json(rows);
    });
};

// Controller to update appointment status (for potential admin use)
exports.updateAppointmentStatus = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
        return res.status(400).json({ message: 'Status is required.' });
    }
    const allowedStatuses = ['Pending', 'Confirmed', 'Cancelled', 'Completed'];
    if (!allowedStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value. Allowed values are: Pending, Confirmed, Cancelled, Completed.' });
    }

    const db = getDb();
    const stmt = db.prepare('UPDATE appointments SET status = ? WHERE id = ?');
    stmt.run(status, id, function(err) {
        if (err) {
            console.error('Error updating appointment status:', err.message);
            return res.status(500).json({ message: 'Failed to update appointment status.' });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Appointment not found or status unchanged.' });
        }
        res.status(200).json({ message: 'Appointment status updated successfully.' });
    });
    stmt.finalize();
};
