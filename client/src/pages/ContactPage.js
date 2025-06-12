import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Icon,
  Link,
  SimpleGrid,
  Spinner,
  Alert,
  AlertIcon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Divider,
} from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa'; // Removed FaClock
import { getClinicInfo, submitContactForm } from '../services/api'; 

const ContactPage = () => {
  const [clinicInfo, setClinicInfo] = useState({
    address: '123 Netra Jyoti Marg, Sector 18, Noida, UP, India',
    phone: '+919876543210',
    email: 'info@visioncareindia.com',
    hours: [
      { days: 'Monday - Saturday', time: '9:00 AM - 7:00 PM' },
      { days: 'Sunday', time: 'Closed' },
    ],
    hours_monday_saturday: '9:00 AM - 7:00 PM', 
    hours_sunday: 'Closed',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        setLoading(true);
        const data = await getClinicInfo();
        if (data) {
            const formattedData = {
                ...data,
                hours: [
                    { days: 'Monday - Saturday', time: data.hours_monday_saturday || '9:00 AM - 7:00 PM'},
                    { days: 'Sunday', time: data.hours_sunday || 'Closed'}
                ]
            };
            setClinicInfo(prev => ({ ...prev, ...formattedData }));
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching clinic info:", err);
        setError('Failed to load complete clinic information. Displaying default details.');
      }
      setLoading(false);
    };
    fetchInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitContactForm(formState);
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.',
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      setFormState({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast({
        title: 'Submission Error',
        description: err.response?.data?.message || err.message || 'Failed to send message. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    }
    setIsSubmitting(false);
  };

  return (
    <Box py={{ base: 8, md: 10 }} bg="bg.subtle">
      <Container maxW="container.xl">
        <VStack spacing={10} align="stretch">
          <Box textAlign="center">
            <Heading as="h1" size={{ base: "lg", md: "xl" }} color="brand.primary" mb={4}>
              Contact Us
            </Heading>
            <Text fontSize={{ base: "md", md: "lg" }} color="text.default">
              We\'re here to help. Reach out to us with any questions or to schedule an appointment.
            </Text>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
              <Spinner size="xl" color="brand.primary" thickness="4px" speed="0.65s" emptyColor="neutral.lightGray" />
            </Box>
          )}

          {error && (
            <Alert status="warning" borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          
          {!loading && (
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} bg="white" p={{base: 6, md:8}} borderRadius="lg" shadow="md">
              <VStack spacing={6} align="start">
                <Heading as="h3" size="lg" color="brand.primary">Clinic Information</Heading>
                <HStack align="start">
                  <Icon as={FaMapMarkerAlt} color="brand.secondary" w={5} h={5} mt={1} />
                  <Text color="text.default">{clinicInfo.address}</Text>
                </HStack>
                <HStack>
                  <Icon as={FaPhone} color="brand.secondary" w={5} h={5} />
                  <Link href={`tel:${clinicInfo.phone}`} color="brand.secondary" _hover={{ textDecoration: 'underline', color: 'brand.primary' }}>
                    {clinicInfo.phone}
                  </Link>
                </HStack>
                <HStack>
                  <Icon as={FaEnvelope} color="brand.secondary" w={5} h={5} />
                  <Link href={`mailto:${clinicInfo.email}`} color="brand.secondary" _hover={{ textDecoration: 'underline', color: 'brand.primary' }}>
                    {clinicInfo.email}
                  </Link>
                </HStack>
                <Divider my={3} borderColor="border.default"/>
                <Heading as="h4" size="md" color="brand.primary">Clinic Hours</Heading>
                {clinicInfo.hours && clinicInfo.hours.map((item, index) => (
                   <HStack key={index} w="full" justifyContent="space-between">
                     <Text fontWeight="medium" color="text.default">{item.days}:</Text>
                     <Text color="text.default">{item.time}</Text>
                   </HStack>
                ))}
              </VStack>
              
              <VStack spacing={4} align="stretch" as="form" onSubmit={handleSubmit}>
                <Heading as="h3" size="lg" color="brand.primary" mb={2}>Send Us a Message</Heading>
                <FormControl isRequired id="contact-name">
                  <FormLabel color="text.default">Full Name</FormLabel>
                  <Input type="text" name="name" value={formState.name} onChange={handleInputChange} focusBorderColor="brand.primary" bg="bg.subtle" />
                </FormControl>
                <FormControl isRequired id="contact-email">
                  <FormLabel color="text.default">Email Address</FormLabel>
                  <Input type="email" name="email" value={formState.email} onChange={handleInputChange} focusBorderColor="brand.primary" bg="bg.subtle"/>
                </FormControl>
                <FormControl isRequired id="contact-subject">
                  <FormLabel color="text.default">Subject</FormLabel>
                  <Input type="text" name="subject" value={formState.subject} onChange={handleInputChange} focusBorderColor="brand.primary" bg="bg.subtle"/>
                </FormControl>
                <FormControl isRequired id="contact-message">
                  <FormLabel color="text.default">Message</FormLabel>
                  <Textarea name="message" value={formState.message} onChange={handleInputChange} focusBorderColor="brand.primary" rows={5} bg="bg.subtle"/>
                </FormControl>
                <Button 
                  type="submit" 
                  colorScheme="brand.primary"
                  isLoading={isSubmitting}
                  loadingText="Sending..."
                  w={{ base: "full", md: "auto" }}
                  alignSelf={{ base: "stretch", md: "flex-start" }}
                  size="lg"
                >
                  Send Message
                </Button>
              </VStack>
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactPage;
