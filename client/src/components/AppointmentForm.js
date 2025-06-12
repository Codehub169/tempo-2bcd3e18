import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Select,
  Textarea,
  Heading,
  useToast,
  Spinner,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';
// import api from '../services/api'; // Assuming api.js will be created with submitAppointment function

const AppointmentForm = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    phone: '',
    service: '',
    preferredDoctor: '',
    preferredDate: '',
    preferredTime: '',
    reason: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    let newErrors = {};
    if (!formData.patientName.trim()) newErrors.patientName = 'Full Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required.';
    } else if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(formData.phone)) { // Indian phone validation (10 digits starting with 7,8,9, optional +91)
        newErrors.phone = 'Please enter a valid 10-digit Indian mobile number.';
    }
    if (!formData.service) newErrors.service = 'Please select a service.';
    if (!formData.preferredDate) newErrors.preferredDate = 'Preferred date is required.';
    if (!formData.preferredTime) newErrors.preferredTime = 'Preferred time slot is required.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
        toast({
            title: 'Validation Error',
            description: 'Please fill all required fields correctly.',
            status: 'error',
            duration: 5000,
            isClosable: true,
            position: 'top',
        });
        return;
    }
    setIsLoading(true);
    try {
      // const response = await api.submitAppointment(formData); // Uncomment when api.js is ready
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500)); 
      console.log('Form submitted:', formData); // For development: log form data

      toast({
        title: 'Appointment Request Submitted.',
        description: "We've received your request and will contact you shortly to confirm.",
        status: 'success',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
      setFormData({
        patientName: '',
        email: '',
        phone: '',
        service: '',
        preferredDoctor: '',
        preferredDate: '',
        preferredTime: '',
        reason: '',
      });
      setErrors({});
    } catch (error) {
      console.error('Submission error:', error); // For development: log error
      toast({
        title: 'Submission Failed.',
        description: error.response?.data?.message || 'An error occurred. Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top',
      });
    }
    setIsLoading(false);
  };

  const services = [
    'Comprehensive Eye Exam',
    'Cataract Surgery Consult',
    'LASIK Consultation',
    'Glaucoma Check-up',
    'Pediatric Eye Care',
    'Contact Lens Fitting',
    'Diabetic Retinopathy Screening',
    'Optical Services',
    'Other',
  ];

  const doctors = [
    // 'Any Available', // Handled by placeholder in Select
    'Dr. Priya Sharma',
    'Dr. Rohan Patel',
    'Dr. Ananya Das',
    'Dr. Vikram Singh',
  ];

  return (
    <Box 
      p={{ base: 4, md: 8 }}
      borderWidth={1} 
      borderRadius="lg" 
      boxShadow="xl" 
      bg="bg.default"
      maxW="xl"
      mx="auto"
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center" color="brand.primary">
        Book Your Appointment
      </Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing={5} align="stretch">
          <FormControl isRequired isInvalid={!!errors.patientName}>
            <FormLabel htmlFor="patientName">Full Name</FormLabel>
            <Input
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="e.g., Priya Sharma"
              focusBorderColor="brand.primary"
            />
            {errors.patientName && <FormErrorMessage>{errors.patientName}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email Address</FormLabel>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g., priya.sharma@example.com"
              focusBorderColor="brand.primary"
            />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone Number</FormLabel>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g., 9876543210 or +919876543210"
              focusBorderColor="brand.primary"
            />
            {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.service}>
            <FormLabel htmlFor="service">Service Required</FormLabel>
            <Select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Select a service"
              focusBorderColor="brand.primary"
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </Select>
            {errors.service && <FormErrorMessage>{errors.service}</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="preferredDoctor">Preferred Doctor (Optional)</FormLabel>
            <Select
              id="preferredDoctor"
              name="preferredDoctor"
              value={formData.preferredDoctor}
              onChange={handleChange}
              placeholder="Any available doctor"
              focusBorderColor="brand.primary"
            >
              {doctors.map((doctor) => (
                <option key={doctor} value={doctor}>
                  {doctor}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.preferredDate}>
            <FormLabel htmlFor="preferredDate">Preferred Date</FormLabel>
            <Input
              id="preferredDate"
              name="preferredDate"
              type="date"
              value={formData.preferredDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
              focusBorderColor="brand.primary"
            />
            {errors.preferredDate && <FormErrorMessage>{errors.preferredDate}</FormErrorMessage>}
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.preferredTime}>
            <FormLabel htmlFor="preferredTime">Preferred Time Slot</FormLabel>
            <Select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              placeholder="Select a time slot"
              focusBorderColor="brand.primary"
            >
              <option value="Morning (9AM-12PM)">Morning (9AM-12PM)</option>
              <option value="Afternoon (1PM-4PM)">Afternoon (1PM-4PM)</option>
              <option value="Evening (4PM-7PM)">Evening (4PM-7PM)</option>
            </Select>
            {errors.preferredTime && <FormErrorMessage>{errors.preferredTime}</FormErrorMessage>}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="reason">Reason for Visit (Optional)</FormLabel>
            <Textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Briefly describe your reason for visit or any specific concerns."
              rows={3}
              focusBorderColor="brand.primary"
            />
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="brand.primary" // Uses custom variant from theme.js
            isLoading={isLoading}
            loadingText="Submitting..."
            size="lg"
            w="full"
            mt={4}
            leftIcon={isLoading ? <Spinner size="sm" /> : undefined}
          >
            Request Appointment
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

export default AppointmentForm;
