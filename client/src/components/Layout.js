import React from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';
import Footer from './Footer';

// Layout component to wrap all pages, including Navbar and Footer
const Layout = ({ children }) => {
  return (
    <Flex direction="column" minHeight="100vh" bg="bg.subtle">
      {/* Navbar component at the top of every page */}
      <Navbar />

      {/* Main content area for each page */}
      <Box as="main" flexGrow={1} py={{ base: 6, md: 8}}>
        <Container maxW="container.xl">
            {children}
        </Container>
      </Box>

      {/* Footer component at the bottom of every page */}
      <Footer />
    </Flex>
  );
};

export default Layout;
