import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  useDisclosure,
  Stack,
  Link as ChakraLink,
  Heading,
  Container,
  Drawer, 
  DrawerOverlay, 
  DrawerContent, 
  DrawerCloseButton, 
  DrawerHeader, 
  DrawerBody,
  VStack
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { NavLink as RouterNavLink } from 'react-router-dom';

// Navigation links configuration
const NavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Doctors', path: '/doctors' },
  { name: 'Contact Us', path: '/contact' },
];

// Custom NavLink component to integrate React Router's NavLink with Chakra UI styling
const NavLink = ({ to, children }) => (
  <ChakraLink
    as={RouterNavLink}
    to={to}
    px={3}
    py={2}
    rounded={'md'}
    fontFamily={'body'}
    fontWeight={500}
    color={'brand.neutral.dark'}
    _hover={{
      textDecoration: 'none',
      bg: 'brand.primaryLight',
      color: 'brand.primary'
    }}
    _activeLink={{
      fontWeight: 'bold',
      color: 'brand.primary',
      bg: 'brand.primaryLight',
    }}
  >
    {children}
  </ChakraLink>
);

// Main Navbar component
const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure(); // For mobile navigation drawer

  return (
    <Box bg="white" boxShadow="sm" position="sticky" top={0} zIndex="sticky" fontFamily="heading">
      <Container maxW="container.xl">
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          {/* Mobile menu button */}
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color="brand.primary"
          />

          {/* Logo/Site Name */}
          <HStack spacing={8} alignItems={'center'}>
            <ChakraLink as={RouterNavLink} to="/" _hover={{ textDecoration: 'none'}}>
                <Heading as="h1" size="lg" color="brand.primary">
                VisionCare
                </Heading>
            </ChakraLink>
            
            {/* Desktop Navigation Links */}
            <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
              {NavLinks.map((link) => (
                <NavLink key={link.name} to={link.path}>
                  {link.name}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          {/* Book Appointment Button (Desktop) */}
          <Button
            as={RouterNavLink}
            to="/appointment"
            colorScheme="accent"
            size={'md'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontFamily={'body'}
          >
            Book Appointment
          </Button>

           {/* Book Appointment Button (Mobile - visible when menu icon is shown) */}
           <Button
            as={RouterNavLink}
            to="/appointment"
            colorScheme="accent"
            size={'sm'} 
            display={{ base: 'inline-flex', md: 'none' }}
            ml={2} 
            fontFamily={'body'}
          >
            Book Now
          </Button>
        </Flex>
      </Container>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader color="brand.primary">VisionCare Menu</DrawerHeader>
            <DrawerBody>
              <VStack as={'nav'} spacing={4} align="stretch">
                {NavLinks.map((link) => (
                  <NavLink key={link.name} to={link.path}>
                    {link.name}
                  </NavLink>
                ))}
                 <Button
                    as={RouterNavLink}
                    to="/appointment"
                    colorScheme="accent"
                    w="full"
                    onClick={onClose} // Close drawer on click
                    fontFamily={'body'}
                  >
                    Book Appointment
                  </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
};

export default Navbar;
