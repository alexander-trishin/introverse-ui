import React from 'react';
import { useHistory } from 'react-router-dom';
import { Typography, Box, Button } from '@material-ui/core';
import { ArrowBack, Home } from '@material-ui/icons';

const NotFoundPage = () => {
    const history = useHistory();

    const goBack = () => history.goBack();
    const goHome = () => history.replace('/');

    return (
        <Box
            position="fixed"
            top={0}
            right={0}
            bottom={0}
            left={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <Typography variant="h1" color="secondary">
                404
            </Typography>
            <Typography variant="h5" color="textSecondary">
                No route for: {history.location.pathname}
            </Typography>
            <Box p={2}>
                <Box mr={4} clone>
                    <Button startIcon={<ArrowBack />} variant="outlined" onClick={goBack}>
                        Go Back
                    </Button>
                </Box>
                <Button startIcon={<Home />} variant="outlined" onClick={goHome}>
                    Go Home
                </Button>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
