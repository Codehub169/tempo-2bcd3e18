import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  SimpleGrid,
  Icon,
  Divider,
  HStack,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

// Footer component for the application
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Box bg="text.default" color="text.inverted" py={10} fontFamily="body">
      <Container maxW="container.xl">
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} mb={8}>
          {/* Column 1: Clinic Info */}
          <Stack spacing={4} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="xl" fontWeight="bold" color="brand.secondary" fontFamily="heading">
              VisionCare India
            </Text>
            <HStack align="flex-start">
              <Icon as={FaMapMarkerAlt} w={4} h={4} mt={1} color="brand.secondary"/>
              <Text fontSize="sm">
                123 Netra Jyoti Marg, Sector 18, <br />
                Noida, Uttar Pradesh 201301, India
              </Text>
            </HStack>
            <HStack align="center">
              <Icon as={FaPhone} w={4} h={4} color="brand.secondary"/>
              <Link href="tel:+919876543210" fontSize="sm" _hover={{ color: 'brand.accent' }}>
                +91 98765 43210
              </Link>
            </HStack>
            <HStack align="center">
              <Icon as={FaEnvelope} w={4} h={4} color="brand.secondary"/>
              <Link href="mailto:info@visioncareindia.com" fontSize="sm" _hover={{ color: 'brand.accent' }}>
                info@visioncareindia.com
              </Link>
            </HStack>
          </Stack>

          {/* Column 2: Quick Links */}
          <Stack spacing={2} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="lg" fontWeight="semibold" color="brand.secondary" mb={2} fontFamily="heading">
              Quick Links
            </Text>
            <Link as={RouterLink} to="/" _hover={{ color: 'brand.accent', textDecoration: 'underline' }}>Home</Link>
            <Link as={RouterLink} to="/services" _hover={{ color: 'brand.accent', textDecoration: 'underline' }}>Services</Link>
            <Link as={RouterLink} to="/doctors" _hover={{ color: 'brand.accent', textDecoration: 'underline' }}>Doctors</Link>
            <Link as={RouterLink} to="/contact" _hover={{ color: 'brand.accent', textDecoration: 'underline' }}>Contact Us</Link>
            <Link as={RouterLink} to="/appointment" _hover={{ color: 'brand.accent', textDecoration: 'underline' }}>Book Appointment</Link>
          </Stack>

          {/* Column 3: Clinic Hours */}
          <Stack spacing={2} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="lg" fontWeight="semibold" color="brand.secondary" mb={2} fontFamily="heading">
              Clinic Hours
            </Text>
            <Text fontSize="sm">Monday - Saturday: 9:00 AM - 7:00 PM</Text>
            <Text fontSize="sm">Sunday: Closed</Text>
          </Stack>

          {/* Column 4: Placeholder for About/Mission (Optional) */}
          <Stack spacing={2} align={{ base: 'center', md: 'flex-start' }}>
            <Text fontSize="lg" fontWeight="semibold" color="brand.secondary" mb={2} fontFamily="heading">
              Our Mission
            </Text>
            <Text fontSize="sm">
              Providing exceptional eye care with compassion and cutting-edge technology to enhance the vision and lives of our community.
            </Text>
          </Stack>
        </SimpleGrid>

        <Divider borderColor="border.default" />

        <Text pt={8} fontSize="sm" textAlign="center">
          &copy; {currentYear} VisionCare India. All Rights Reserved. Designed for a brighter vision.
        </Text>
      </Container>
    </Box>
  );
};

export default Footer;
