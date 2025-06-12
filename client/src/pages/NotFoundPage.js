import React from 'react';
import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <Container maxW="container.md" py={{ base: 12, md: 24 }}>
      <VStack spacing={8} textAlign="center">
        <Heading as="h1" size={{ base: "2xl", md: "4xl" }} color="brand.primary">
          404
        </Heading>
        <Heading as="h2" size={{ base: "lg", md: "xl" }} color="text.default">
          Page Not Found
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="text.light">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </Text>
        <Button
          as={RouterLink}
          to="/"
          colorScheme="brand.primary"
          size="lg"
          px={8}
        >
          Go to Homepage
        </Button>
      </VStack>
    </Container>
  );
};

export default NotFoundPage;
