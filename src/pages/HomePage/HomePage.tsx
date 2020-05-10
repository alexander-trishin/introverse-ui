import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography, useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

import { UnderConstructionIcon } from 'components/Icons';

const HomePage = () => {
    const { t } = useTranslation();

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));

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
            <Box height={sm ? '40%' : '70%'} width="90%">
                <Box height="100% !important" width="100% !important" clone>
                    <UnderConstructionIcon />
                </Box>
            </Box>
            <Box color="primary.light" clone>
                <Typography align="center" variant={sm ? 'h4' : 'h3'}>
                    <Box fontWeight="fontWeightLight">{t('under-construction')}</Box>
                </Typography>
            </Box>
            <Box color="primary.light" fontWeight="light" clone>
                <Typography align="center" variant={sm ? 'h6' : 'h5'}>
                    <Box fontWeight="fontWeightLight">{t('come-later')}</Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default HomePage;
