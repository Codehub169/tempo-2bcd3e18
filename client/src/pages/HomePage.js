import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  SimpleGrid,
  Flex,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaUserMd, FaEye, FaUsers } from 'react-icons/fa'; // FaCalendarCheck, FaClinicMedical removed as not used in this version
import ServiceCard from '../components/ServiceCard';
import DoctorCard from '../components/DoctorCard';
import { getServices, getDoctors } from '../services/api'; 

const HomePage = () => {
  const [services, setServices] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [servicesData, doctorsData] = await Promise.all([
          getServices({ limit: 3 }), 
          getDoctors({ limit: 3 })   
        ]);
        setServices(servicesData || []);
        setDoctors(doctorsData || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching homepage data:", err);
        setError('Failed to load clinic highlights. Some information may be missing.');
        // Set empty arrays on error to prevent breaking map functions, but still show error
        setServices([]); 
        setDoctors([]);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  // Hero Section
  const HeroSection = () => (
    <Flex 
      align="center" 
      justify="center" 
      minH={{ base: '60vh', sm: '70vh', md: '85vh' }} 
      bgImage="url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')" 
      bgSize="cover" 
      bgPos="center" 
      color="white"
      textAlign="center"
      px={{ base: 4, md: 6 }}
    >
      <Box maxW={{ base: "md", md: "xl", lg: "2xl"}} bg="rgba(46, 134, 193, 0.7)" p={{base: 6, md:10}} borderRadius="lg" shadow="xl">
        <Heading as="h1" size={{base: 'xl', md: '2xl', lg: '3xl'}} fontWeight="bold" mb={6} color="white">
          Your Vision, Our Priority.
          <Text as="span" display="block" fontSize={{base: 'md', md: 'xl'}} fontWeight="normal" mt={2} color="brand.neutral.extralight">
            Leading Eye Care in India.
          </Text>
        </Heading>
        <Text fontSize={{base: 'sm', md: 'lg'}} mb={8} opacity={0.95} color="brand.neutral.light">
          Experience compassionate and comprehensive eye care with state-of-the-art technology and expert ophthalmologists at VisionCare India.
        </Text>
        <Button as={RouterLink} to="/appointment" colorScheme="accentScheme" size="lg" px={{base:6, md:10}} py={{base:5, md:6}} _hover={{bg: "brand.accentHover"}}>
          Book an Appointment
        </Button>
      </Box>
    </Flex>
  );

  // Services Overview Section
  const ServicesOverview = () => (
    <Box py={{ base: 12, md: 16 }} bg="brand.neutral.extralight">
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center" mb={12}>
          <Heading as="h2" size={{ base: "lg", md: "xl" }} color="brand.primary">Our Key Services</Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="brand.neutral.dark" maxW="container.md" mx="auto">
            We offer a wide range of specialized eye care services to meet your needs, from routine exams to advanced surgical procedures.
          </Text>
        </VStack>
        {loading && services.length === 0 && <Box textAlign="center"><Spinner size="lg" color="brand.primary" /></Box>}
        {!loading && services.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={{ base: 6, md: 8, lg:10 }}>
            {services.map(service => <ServiceCard key={service.id || service.name} service={service} />)}
          </SimpleGrid>
        )}
        {!loading && services.length === 0 && !error && (
            <Text textAlign="center" color="brand.neutral.dark">Services information is currently unavailable.</Text>
        )}
        <Box textAlign="center" mt={12}>
          <Button as={RouterLink} to="/services" colorScheme="secondaryScheme" variant="outline" size="lg">
            Explore All Services
          </Button>
        </Box>
      </Container>
    </Box>
  );

  // Doctors Preview Section
  const DoctorsPreview = () => (
    <Box py={{ base: 12, md: 16 }} bg="white">
      <Container maxW="container.xl">
        <VStack spacing={4} textAlign="center" mb={12}>
          <Heading as="h2" size={{ base: "lg", md: "xl" }} color="brand.primary">Meet Our Expert Doctors</Heading>
          <Text fontSize={{ base: "md", md: "lg" }} color="brand.neutral.dark" maxW="container.md" mx="auto">
            Our experienced and compassionate doctors are dedicated to providing the highest standard of eye care.
          </Text>
        </VStack>
        {loading && doctors.length === 0 && <Box textAlign="center"><Spinner size="lg" color="brand.primary" /></Box>}
        {!loading && doctors.length > 0 && (
          <SimpleGrid columns={{ base: 1, sm:2, md: 3 }} spacing={{ base: 6, md: 8, lg:10 }}>
            {doctors.map(doctor => <DoctorCard key={doctor.id || doctor.name} doctor={doctor} />)}
          </SimpleGrid>
        )}
         {!loading && doctors.length === 0 && !error && (
            <Text textAlign="center" color="brand.neutral.dark">Doctors information is currently unavailable.</Text>
        )}
        <Box textAlign="center" mt={12}>
          <Button as={RouterLink} to="/doctors" colorScheme="primaryScheme" size="lg">
            View All Doctors
          </Button>
        </Box>
      </Container>
    </Box>
  );

  // Why Choose Us Section
  const WhyChooseUs = () => {
    const reasons = [
      { icon: FaUserMd, title: 'Expert Medical Team', description: 'Highly qualified ophthalmologists dedicated to your eye health.' },
      { icon: FaEye, title: 'Advanced Technology', description: 'Utilizing the latest diagnostic and surgical equipment for precise care.' },
      { icon: FaUsers, title: 'Patient-Centric Care', description: 'Compassionate and personalized approach to meet your individual needs.' },
    ];
    return (
      <Box py={{ base: 12, md: 16 }} bg="brand.neutral.extralight">
        <Container maxW="container.xl">
          <VStack spacing={4} textAlign="center" mb={12}>
            <Heading as="h2" size={{ base: "lg", md: "xl" }} color="brand.primary">Why Choose VisionCare India?</Heading>
          </VStack>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8, lg:10 }} alignItems="stretch">
            {reasons.map(reason => (
              <VStack key={reason.title} bg="white" p={{base:6, md:8}} borderRadius="lg" shadow="md" spacing={4} align="center" textAlign="center" transition="all 0.3s ease-in-out" _hover={{transform: "translateY(-5px)", shadow: "lg"}}>
                <Icon as={reason.icon} w={{base:10, md:12}} h={{base:10, md:12}} color="brand.secondary" />
                <Heading as="h4" size="md" color="brand.primary">{reason.title}</Heading>
                <Text color="brand.neutral.dark" fontSize="sm">{reason.description}</Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    );
  };

  // CTA Section
  const CTASection = () => (
    <Box py={{ base: 12, md: 16 }} bg="brand.primary" color="white">
      <Container maxW="container.md" textAlign="center">
        <Heading as="h2" size={{ base: "lg", md: "xl" }} mb={4} color="white">Ready for Clearer Vision?</Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mb={8} opacity={0.95} color="brand.neutral.light">
          Don't wait to take care of your eyes. Schedule your consultation with our experts today.
        </Text>
        <Button as={RouterLink} to="/appointment" colorScheme="accentScheme" size="lg" px={{base:6, md:10}} py={{base:5, md:6}} _hover={{bg: "brand.accentHover"}}>
          Book Appointment Now
        </Button>
      </Container>
    </Box>
  );

  return (
    <Box>
      <HeroSection />
      <ServicesOverview />
      <DoctorsPreview />
      <WhyChooseUs />
      <CTASection />
      {error && (
          <Container maxW="container.xl" py={4}>
            <Alert status="warning" borderRadius="md">
                <AlertIcon />
                {error} Some sections might not display correctly.
            </Alert>
          </Container>
      )}
    </Box>
  );
};

export default HomePage;
