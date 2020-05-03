import React from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@material-ui/core';

const HomePage = () => {
    const { t } = useTranslation();
    const [ellipsis, setEllipsis] = React.useState('.');

    React.useEffect(() => {
        setTimeout(() => setEllipsis(ellipsis.length < 3 ? ellipsis + '.' : '.'), 1000);
    }, [ellipsis]);

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
            <Typography variant="h6" color="primary">
                {t('under-construction')} {ellipsis}
            </Typography>
        </Box>
    );
};

export default HomePage;
