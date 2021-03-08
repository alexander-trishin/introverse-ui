import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Routes } from 'common/routes';
import { LoadingOverlay } from 'components';

const ComingSoonPage = lazy(() => import('pages/ComingSoonPage'));

const MainPage = () => {
    return (
        <Suspense fallback={<LoadingOverlay />}>
            <Switch>
                <Route exact path={Routes.Page.Home} component={ComingSoonPage} />
                <Redirect to={Routes.Error.NotFound} />
            </Switch>
        </Suspense>
    );
};

export default MainPage;
