import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Will be created in a future batch
import HomePage from './pages/HomePage'; // Will be created in a future batch
import ServicesPage from './pages/ServicesPage'; // Will be created in a future batch
import DoctorsPage from './pages/DoctorsPage'; // Will be created in a future batch
import ContactPage from './pages/ContactPage'; // Will be created in a future batch
import AppointmentPage from './pages/AppointmentPage'; // Will be created in a future batch
// import NotFoundPage from './pages/NotFoundPage'; // Placeholder for 404 page

function App() {
  return (
    <Layout> {/* Layout will provide Navbar and Footer globally */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/appointment" element={<AppointmentPage />} />
        {/* Add more routes here as needed, e.g., for individual doctor profiles or service details */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Layout>
  );
}

export default App;
