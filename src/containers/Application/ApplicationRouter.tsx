import React from 'react';
import { Switch, Route } from 'react-router-dom';

import BannerPage from 'pages/BannerPage';
import HomePage from 'pages/HomePage';
import NotFoundPage from 'pages/NotFoundPage';

const ApplicationRouter = () => (
    <>
        <Switch>
            <Route exact path="/" component={HomePage} />
            <Route component={NotFoundPage} />
        </Switch>
        <Route component={BannerPage} />
    </>
);

export default ApplicationRouter;
