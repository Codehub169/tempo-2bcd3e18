import React, { useEffect, useState } from 'react';
import { Box, Heading, Text, Container, Spinner, Alert, AlertIcon, VStack } from '@chakra-ui/react';
import AppointmentForm from '../components/AppointmentForm';
import { getServices, getDoctors } from '../services/api'; // Assuming api service exists
import { useLocation } from 'react-router-dom';

const AppointmentPage = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Get pre-selected doctorId or serviceId from URL query params
  const queryParams = new URLSearchParams(location.search);
  const preselectedDoctorId = queryParams.get('doctorId');
  const preselectedServiceId = queryParams.get('serviceId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData, doctorsData] = await Promise.all([
          getServices(),
          getDoctors()
        ]);
        setServices(servicesData || []);
        setDoctors(doctorsData || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching services or doctors:", err);
        setError('Failed to load necessary data for appointments. Please try again later.');
        setServices([]);
        setDoctors([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <Box py={{ base: 8, md: 10 }} bg="brand.neutral.extralight">
      <Container maxW="container.md">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size={{ base: "lg", md: "xl" }} color="brand.primary" mb={4}>
              Book Your Appointment
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="brand.neutral.dark">
              Fill out the form below to schedule your visit. Our team will contact you to confirm the details.
            </Text>
          </Box>

          {loading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" color="brand.primary" thickness="4px" speed="0.65s" emptyColor="brand.neutral.light" />
              <Text mt={4} color="brand.neutral.dark">Loading appointment form...</Text>
            </Box>
          )}

          {error && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <AppointmentForm 
              services={services} 
              doctors={doctors} 
              preselectedDoctorId={preselectedDoctorId}
              preselectedServiceId={preselectedServiceId}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default AppointmentPage;
