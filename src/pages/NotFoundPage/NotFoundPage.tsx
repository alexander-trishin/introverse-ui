import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Button } from '@material-ui/core';
import { ArrowBack, Home } from '@material-ui/icons';

const NotFoundPage = () => {
    const history = useHistory();
    const { t } = useTranslation();

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
                {t('page-not-found')}: {history.location.pathname}
            </Typography>
            <Box p={2}>
                <Box display="inline" m={2}>
                    <Button startIcon={<ArrowBack />} variant="outlined" onClick={goBack}>
                        {t('go-back')}
                    </Button>
                </Box>
                <Box display="inline" m={2}>
                    <Button startIcon={<Home />} variant="outlined" onClick={goHome}>
                        {t('go-home')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
