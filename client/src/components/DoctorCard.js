import React from 'react';
import { Box, Image, Heading, Text, Button, VStack, Tag } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

// Component to display a single doctor's profile card
const DoctorCard = ({ doctor }) => {
  // Destructure doctor properties with default fallbacks
  const {
    id = 'default-id',
    name = 'Dr. Placeholder',
    specialty = 'Specialty Unavailable',
    qualifications = 'Qualifications not listed',
    imageUrl = 'https://via.placeholder.com/300x320.png?text=Doctor+Photo',
    bio = 'A brief bio about the doctor will appear here. They are dedicated to providing the best care.',
  } = doctor;

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      bg="white"
      transition="all 0.3s ease-in-out"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'xl',
      }}
      height="100%" // Ensure cards in a grid have same height
      display="flex"
      flexDirection="column"
    >
      <Image src={imageUrl} alt={`Photo of ${name}`} objectFit="cover" h="320px" w="100%" />

      <VStack p={6} spacing={4} align="stretch" flexGrow={1} justifyContent="space-between">
        <Box>
          <Heading as="h3" size="lg" color="brand.primary" fontFamily="heading">
            {name}
          </Heading>
          <Tag size="md" variant="subtle" colorScheme="green" mt={2} mb={3} fontFamily="body">
            {specialty}
          </Tag>
          <Text fontSize="sm" color="gray.600" fontStyle="italic" mb={3} fontFamily="body">
            {qualifications}
          </Text>
          <Text fontSize="md" color="gray.700" noOfLines={4} flexGrow={1} fontFamily="body">
            {bio}
          </Text>
        </Box>
        
        <Button
          as={RouterLink}
          to={`/appointment?doctorId=${id}`}
          colorScheme="secondary"
          variant="solid"
          fontFamily="body"
          w="full"
        >
          Book with {name.split(' ').slice(0, 2).join(' ')}
        </Button>
      </VStack>
    </Box>
  );
};

export default DoctorCard;
