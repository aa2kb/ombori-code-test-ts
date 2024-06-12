import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import InfiniteScroll from './components/InfiniteScroll';

const App: React.FC = () => (
  <ChakraProvider>
    <InfiniteScroll />
  </ChakraProvider>
);

export default App;
