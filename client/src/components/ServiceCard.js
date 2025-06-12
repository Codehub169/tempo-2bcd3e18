import React from 'react';
import {
  Box,
  Icon,
  Heading,
  Text,
  Button,
  VStack,
  LinkBox,
  LinkOverlay,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaEye, FaUserMd, FaChild, FaGlasses, FaQuestionCircle } from 'react-icons/fa'; // Added FaQuestionCircle for default

// Mapping of service IDs/names to icons (can be expanded)
const serviceIcons = {
  'comprehensive-eye-exams': FaEye,
  'cataract-surgery': FaUserMd,
  'lasik-refractive-surgery': FaEye,
  'pediatric-eye-care': FaChild,
  'optical-services': FaGlasses,
  'default': FaQuestionCircle // Changed to a more generic default icon
};

// Component to display a single service card
const ServiceCard = ({ service }) => {
  // Destructure service properties with default fallbacks
  const {
    id = 'default-service-id', // Ensure unique default ID if multiple default cards are possible
    name = 'Service Name Placeholder',
    description = 'Detailed description of the service offered by the clinic. This will give users an idea of what to expect.',
    iconKey = 'default',
    detailsLink, // Expecting this from backend if specific link is needed
  } = service;

  const ServiceIconComponent = serviceIcons[iconKey] || serviceIcons['default'];
  const effectiveLink = detailsLink || (id !== 'default-service-id' ? `/services/${id}` : '#'); // Avoid dead link for placeholder
  
  // Button links to appointment page with serviceId, or general appointment page for default/placeholder
  const buttonLinkTo = id !== 'default-service-id' ? `/appointment?serviceId=${id}` : '/appointment';

  return (
    <LinkBox 
      as={Box}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white" // Uses bg.default implicitly via global styles or direct theme value
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
        borderColor: 'brand.primary'
      }}
      height="100%" // Ensure cards in a grid have same height
      display="flex"
      flexDirection="column"
      textAlign={{ base: 'center', md: 'left' }}
    >
      <VStack spacing={4} align={{ base: 'center', md: 'flex-start' }} flexGrow={1} justifyContent="space-between">
        <Box>
          <Icon as={ServiceIconComponent} w={10} h={10} color="brand.secondary" mb={4} />
          <Heading as="h3" size="md" color="brand.primary" mb={2} fontFamily="heading">
            {effectiveLink !== '#' ? (
                <LinkOverlay as={RouterLink} to={effectiveLink}>
                    {name}
                </LinkOverlay>
            ) : (
                name // Render name as plain text if no valid link
            )}
          </Heading>
          <Text fontSize="sm" color="text.light" noOfLines={3} flexGrow={1} fontFamily="body">
            {description}
          </Text>
        </Box>
        
        <Button
          as={RouterLink}
          to={buttonLinkTo}
          colorScheme="brand.secondary"
          variant="outline"
          size="sm"
          fontFamily="body"
          mt={4} // Added margin top for spacing
        >
          Learn More / Book
        </Button>
      </VStack>
    </LinkBox>
  );
};

export default ServiceCard;
