import React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';

import ApplicationRouter from './ApplicationRouter';

const defaultTheme = responsiveFontSizes(createMuiTheme());

const ApplicationTheme = () => (
    <ThemeProvider theme={defaultTheme}>
        <ApplicationRouter />
    </ThemeProvider>
);

export default ApplicationTheme;
