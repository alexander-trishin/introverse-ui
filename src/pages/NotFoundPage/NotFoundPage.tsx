import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Typography, Box, Button, useMediaQuery } from '@material-ui/core';
import { ArrowBack, Home } from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';

import { ReactComponent as NotFoundLogo } from 'assets/svg/not-found.svg';

const NotFoundPage = () => {
    const history = useHistory();
    const { t } = useTranslation();

    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

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
            <Box height={xs ? '25%' : '45%'} width="90%" marginBottom={4} clone>
                <NotFoundLogo />
            </Box>
            <Box color="primary.light" clone>
                <Typography align="center" variant={xs ? 'h4' : 'h3'}>
                    {t('page-not-found')}: {history.location.pathname}
                </Typography>
            </Box>
            <Box p={2} display="flex">
                <Box m={2} whiteSpace="nowrap">
                    <Button
                        startIcon={<ArrowBack />}
                        color="primary"
                        variant="outlined"
                        onClick={goBack}
                        size={xs ? 'small' : 'medium'}
                    >
                        {t('go-back')}
                    </Button>
                </Box>
                <Box m={2} whiteSpace="nowrap">
                    <Button
                        startIcon={<Home />}
                        color="primary"
                        variant="outlined"
                        onClick={goHome}
                        size={xs ? 'small' : 'medium'}
                    >
                        {t('go-home')}
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFoundPage;
