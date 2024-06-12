import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

const InitialLoader: React.FC = () => {
    return (
        <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            backgroundColor="gray.100"
        >
            <Spinner size="xl" />
        </Box>
    );
};

export default InitialLoader;
