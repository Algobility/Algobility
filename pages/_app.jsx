import '../styles/globals.css';
import { ChakraProvider, ModalContextProvider } from '@chakra-ui/react';
import { ThemeProvider } from '@mui/material';
import { generatePalette } from 'palette-by-numbers';
import { extendTheme } from '@chakra-ui/react';
import { createTheme } from '@mui/material/styles';
import { MathJaxContext } from 'better-react-mathjax';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Script from 'next/script.js';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'; // You must import the CSS
import '../styles/globals.css';

const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#41808B',
    },
    mode: 'dark',
  },
});

const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // Set your desired default color mode (e.g., "light", "dark")
    useSystemColorMode: false, // Set to true to enable system color mode
  },

  colors: {
    back: '#1f1f1f',
    backScheme: generatePalette('#303030'),
    backL: '#303030',

    chita: '#efefef',
    chiti: {
      50: '#efefef',
      100: '#efefef',
      200: '#efefef',
      300: '#efefef',
      400: '#efefef',
      500: '#efefef',
      600: '#efefef',
      700: '#efefef',
      800: '#efefef',
      900: '#efefef',
    },

    primc: '#41808B',
    prim: generatePalette('#41808B'),

    eee: {
      50: '#f2ffde',
      100: '#defcb2',
      200: '#caf884',
      300: '#b5f554',
      400: '#a1f226',
      500: '#88d90d',
      600: '#69a905',
      700: '#4a7801',
      800: '#2b4800',
      900: '#0b1900',
    },
  },
});

// These events fire on route changes
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider cssVarsRoot=':root' theme={theme}>
      <ThemeProvider theme={muiTheme}>
        <MathJaxContext>
          <Script
            onLoad={() => console.log('Discord widget script loaded')}
            src='https://dipped.dev/static/plugins/discordwidget/index.js'
            strategy='lazyOnload'
          ></Script>
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </MathJaxContext>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;

