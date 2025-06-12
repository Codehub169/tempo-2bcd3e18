import { extendTheme } from '@chakra-ui/react';
import { lighten } from 'polished'; // Using polished for lightening colors

// Project-specific color palette
const colors = {
  primary: '#2196F3',      // Blue - For primary actions, links, and branding
  secondary: '#4CAF50',    // Green - For success states, secondary actions
  accent: '#FF9800',       // Orange - For prominent CTAs
  neutral: {
    white: '#FFFFFF',
    lightGray: '#F5F5F5',  // For backgrounds
    mediumLightGray: '#EEEEEE', // For borders, dividers
    gray: '#757575',       // For secondary text, disabled states
    darkGray: '#212121',   // For main text content, headings
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
      primaryLight: lighten(0.15, colors.primary), // Defined primaryLight
      secondary: colors.secondary,
      accent: colors.accent,
      accentHover: lighten(0.1, colors.accent), // For hover state on accent buttons
      // Neutral colors are not directly under 'brand' but accessed via 'bg', 'text', 'border' or directly `colors.neutral.*`
    },
    success: colors.semantic.success,
    warning: colors.semantic.warning,
    error: colors.semantic.error,
    bg: {
      default: colors.neutral.white,
      subtle: colors.neutral.lightGray, // This is our 'extralight' equivalent
    },
    text: {
      default: colors.neutral.darkGray,
      light: colors.neutral.gray,
      inverted: colors.neutral.white,
    },
    border: {
      default: colors.neutral.mediumLightGray,
    },
    // Keep direct access to neutral palette if needed
    neutral: colors.neutral, 
  },
  fonts,
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
                bg: lighten(0.1, colors.primary), // Darker shade of primary blue
              },
            };
          }
          if (props.colorScheme === 'brand.secondary') {
            return {
              bg: 'brand.secondary',
              color: 'neutral.white',
              _hover: {
                bg: lighten(0.1, colors.secondary), // Darker shade of secondary green
              },
            };
          }
          if (props.colorScheme === 'brand.accent') {
            return {
              bg: 'brand.accent',
              color: 'neutral.white',
              _hover: {
                bg: 'brand.accentHover',
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
