import { extendTheme } from '@chakra-ui/react';

// Project-specific color palette
const colors = {
  primary: '#2196F3',      // Blue - For primary actions, links, and branding
  secondary: '#4CAF50',    // Green - For success states, secondary actions
  accent: '#FF9800',       // Orange - For prominent CTAs
  neutral: {
    white: '#FFFFFF',
    lightGray: '#F5F5F5',  // Backgrounds, dividers
    mediumLightGray: '#EEEEEE', // Borders, disabled states
    gray: '#757575',       // Secondary text, icons
    darkGray: '#212121',   // Primary text
  },
  semantic: {
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
  },
};

// Project-specific font families
const fonts = {
  heading: "'Poppins', sans-serif", // For headings (H1, H2, H3, etc.)
  body: "'Inter', sans-serif",      // For body text, paragraphs, labels
};

// Custom theme object
const theme = extendTheme({
  colors: {
    brand: {
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
    },
    // You can also map specific semantic colors if needed, e.g., for alerts
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    // Map neutral colors for easier access
    bg: {
      default: colors.neutral.white,
      subtle: colors.neutral.lightGray,
    },
    text: {
      default: colors.neutral.darkGray,
      light: colors.neutral.gray,
      inverted: colors.neutral.white,
    },
    border: {
      default: colors.neutral.mediumLightGray,
    },
  },
  fonts,
  // Example of global style overrides (optional)
  styles: {
    global: {
      'html, body': {
        color: 'text.default',
        lineHeight: 'tall',
        fontFamily: fonts.body,
        bg: 'bg.default',
      },
      a: {
        color: 'brand.primary',
        _hover: {
          textDecoration: 'underline',
          color: 'brand.accent',
        },
      },
      h1: { fontFamily: fonts.heading, color: 'brand.primary' }, 
      h2: { fontFamily: fonts.heading, color: 'brand.primary' }, 
      h3: { fontFamily: fonts.heading, color: 'brand.primary' }, 
      h4: { fontFamily: fonts.heading, color: 'text.default' }, 
      h5: { fontFamily: fonts.heading, color: 'text.default' }, 
      h6: { fontFamily: fonts.heading, color: 'text.default' }, 
    },
  },
  components: {
    Button: {
      variants: {
        solid: (props) => {
          if (props.colorScheme === 'brand.primary') {
            return {
              bg: 'brand.primary',
              color: 'neutral.white',
              _hover: {
                bg: 'blue.600', // Darker shade of primary blue
              },
            };
          }
          if (props.colorScheme === 'brand.secondary') {
            return {
              bg: 'brand.secondary',
              color: 'neutral.white',
              _hover: {
                bg: 'green.600', // Darker shade of secondary green
              },
            };
          }
          if (props.colorScheme === 'brand.accent') {
            return {
              bg: 'brand.accent',
              color: 'neutral.white',
              _hover: {
                bg: 'orange.600', // Darker shade of accent orange
              },
            };
          }
          return {};
        },
      },
    },
  },
});

export default theme;
