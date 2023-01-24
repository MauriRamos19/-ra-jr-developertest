import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



import MainPage from './pages/MainPage';
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
};

const theme = extendTheme({ colors });


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route path='/login' element={<App />} />
          </Route>
          <Route path='/main' element={<MainPage/>}/>
        </Routes>
      </Router>
    </ChakraProvider>
  </React.StrictMode>
);
