import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  VStack,
  Button
} from '@chakra-ui/react';
import DoctorCard from '../components/DoctorCard';
import { getDoctors } from '../services/api'; 
import { Link as RouterLink } from 'react-router-dom';

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const data = await getDoctors();
        setDoctors(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError('Failed to load doctor profiles. Please try again later.');
        setDoctors([]); // Ensure state is empty on error
      }
      setLoading(false);
    };
    fetchDoctors();
  }, []);

  return (
    <Box py={{ base: 8, md: 10 }} bg="bg.subtle">
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size={{ base: "lg", md: "xl" }} color="brand.primary" mb={4}>
              Meet Our Expert Doctors
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="text.default" maxW="container.md" mx="auto">
              Our team of dedicated and highly skilled ophthalmologists is committed to providing you with personalized and expert care. Get to know the professionals who make VisionCare India a trusted name in eye health.
            </Text>
          </Box>

          {loading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" color="brand.primary" thickness="4px" speed="0.65s" emptyColor="neutral.lightGray"/>
              <Text mt={4} color="text.default">Loading doctor profiles...</Text>
            </Box>
          )}

          {error && (
            <Alert status="error" borderRadius="md" maxW="container.md" mx="auto">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {!loading && !error && doctors.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8, lg:10 }}>
              {doctors.map((doctor) => (
                <DoctorCard key={doctor.id || doctor.name} doctor={doctor} />
              ))}
            </SimpleGrid>
          )}

          {!loading && !error && doctors.length === 0 && (
            <Text textAlign="center" fontSize="lg" color="text.default" py={10}>
              No doctor profiles are available at this moment. Please check back later.
            </Text>
          )}

          <Box textAlign="center" mt={doctors.length > 0 ? 8 : 2 }>
            <Button as={RouterLink} to="/appointment" colorScheme="brand.accent" size="lg" px={8}>
              Book an Appointment
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default DoctorsPage;
