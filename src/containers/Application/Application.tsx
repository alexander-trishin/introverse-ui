import React from 'react';
import { Helmet } from 'react-helmet';
import { CssBaseline } from '@material-ui/core';

import ApplicationTheme from './ApplicationTheme';

const Application = () => (
    <>
        <Helmet>
            <title>Introverse</title>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        </Helmet>
        <CssBaseline />
        <ApplicationTheme />
    </>
);

export default Application;
