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
import ServiceCard from '../components/ServiceCard';
import { getServices } from '../services/api'; 
import { Link as RouterLink } from 'react-router-dom';

const ServicesPage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const data = await getServices();
        setServices(data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching services:", err);
        setError('Failed to load services. Please try again later.');
        setServices([]); // Ensure state is empty on error
      }
      setLoading(false);
    };
    fetchServices();
  }, []);

  return (
    <Box py={{ base: 8, md: 10 }} bg="bg.subtle">
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size={{ base: "lg", md: "xl" }} color="brand.primary" mb={4}>
              Our Comprehensive Eye Care Services
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="text.default" maxW="container.md" mx="auto">
              At VisionCare India, we offer a wide range of specialized eye care services to address all your vision needs. Our commitment is to provide you with the highest quality care using advanced technology and techniques.
            </Text>
          </Box>

          {loading && (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" color="brand.primary" thickness="4px" speed="0.65s" emptyColor="neutral.lightGray"/>
              <Text mt={4} color="text.default">Loading services...</Text>
            </Box>
          )}

          {error && (
            <Alert status="error" borderRadius="md" maxW="container.md" mx="auto">
              <AlertIcon />
              {error}
            </Alert>
          )}

          {!loading && !error && services.length > 0 && (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8, lg:10 }}>
              {services.map((service) => (
                <ServiceCard key={service.id || service.name} service={service} />
              ))}
            </SimpleGrid>
          )}

          {!loading && !error && services.length === 0 && (
            <Text textAlign="center" fontSize="lg" color="text.default" py={10}>
              No services are listed at this moment. Please check back later or contact us for more information.
            </Text>
          )}

          <Box textAlign="center" mt={services.length > 0 ? 8 : 2 }>
            <Button as={RouterLink} to="/appointment" colorScheme="brand.accent" size="lg" px={8}>
              Book an Appointment
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default ServicesPage;
