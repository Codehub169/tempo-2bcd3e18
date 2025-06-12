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
import { FaEye, FaUserMd, FaChild, FaGlasses } from 'react-icons/fa'; // Example icons

// Mapping of service IDs/names to icons (can be expanded)
const serviceIcons = {
  'comprehensive-eye-exams': FaEye,
  'cataract-surgery': FaUserMd, // Placeholder, can be more specific
  'lasik-refractive-surgery': FaEye, // Placeholder
  'pediatric-eye-care': FaChild,
  'optical-services': FaGlasses,
  'default': FaEye
};

// Component to display a single service card
const ServiceCard = ({ service }) => {
  // Destructure service properties with default fallbacks
  const {
    id = 'default-service',
    name = 'Service Name Placeholder',
    description = 'Detailed description of the service offered by the clinic. This will give users an idea of what to expect.',
    iconKey = 'default', // Key to look up in serviceIcons map
    linkTo = '/appointment', // Default link for the button
  } = service;

  const ServiceIcon = serviceIcons[iconKey] || serviceIcons['default'];

  return (
    <LinkBox 
      as={Box}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      bg="white"
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
          <Icon as={ServiceIcon} w={10} h={10} color="brand.secondary" mb={4} />
          <Heading as="h3" size="md" color="brand.primary" mb={2} fontFamily="heading">
            <LinkOverlay as={RouterLink} to={`/services/${id}`}>
                {name}
            </LinkOverlay>
          </Heading>
          <Text fontSize="sm" color="gray.600" noOfLines={3} flexGrow={1} fontFamily="body">
            {description}
          </Text>
        </Box>
        
        <Button
          as={RouterLink}
          to={linkTo === '/appointment' ? `/appointment?serviceId=${id}` : `/services/${id}`}
          colorScheme="secondary"
          variant="outline"
          size="sm"
          fontFamily="body"
        >
          Learn More
        </Button>
      </VStack>
    </LinkBox>
  );
};

export default ServiceCard;
