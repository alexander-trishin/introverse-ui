import React from 'react';
import { Box, Fade } from '@material-ui/core';

import { ReactComponent as Logo } from 'assets/svg/logo.svg';

const sessionItemKey = 'showBanner';
const timeout = 2000;

const BannerPage = () => {
    const [showBanner, setShowBanner] = React.useState(
        () => !sessionStorage.getItem(sessionItemKey)
    );
    const [grow, setGrow] = React.useState(showBanner);

    React.useEffect(() => {
        setTimeout(() => {
            if (grow) {
                setGrow(false);
            }
        }, timeout);
    }, [grow]);

    React.useEffect(() => {
        setTimeout(() => {
            if (showBanner) {
                sessionStorage.setItem(sessionItemKey, 'done');
                setShowBanner(false);
            }
        }, timeout * 2);
    }, [showBanner]);

    if (!showBanner) {
        return null;
    }

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
            bgcolor="background.paper"
            zIndex={9999}
        >
            <Fade in={grow} timeout={timeout}>
                <Logo />
            </Fade>
        </Box>
    );
};

export default BannerPage;
