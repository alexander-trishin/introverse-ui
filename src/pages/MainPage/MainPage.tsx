import { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Routes } from 'common/routes';

const ComingSoonPage = lazy(() => import('pages/ComingSoonPage'));

const MainPage = () => {
    return (
        <Suspense fallback={<div>loading...</div>}>
            <Switch>
                <Route exact path={Routes.Page.Home} component={ComingSoonPage} />
                <Redirect to={Routes.Error.NotFound} />
            </Switch>
        </Suspense>
    );
};

export default MainPage;
