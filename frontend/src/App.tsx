import React from 'react';
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';
import { ColorSchemeToggle } from './components/ColorSchemeToggle/ColorSchemeToggle';


function App() {
  return (
    <>
    <MantineProvider theme={theme}>
        <ColorSchemeToggle />
        <div className="App">
          <Router />
        </div>
    </MantineProvider>
  </>
  );
}

export default App;
