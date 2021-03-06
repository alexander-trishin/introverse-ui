import { ErrorInfo, Suspense, lazy } from 'react';
import { Route, Router, Switch } from 'react-router-dom';

import { Routes } from 'common/routes';
import { ErrorBoundary } from 'components';
import { HistoryService } from 'services';

import 'assets/scss/index.scss';

const MainPage = lazy(() => import('pages/MainPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));
const SomethingWentWrongPage = lazy(() => import('pages/SomethingWentWrongPage'));

const Application = () => {
    const handleError = (error: Error, errorInfo: ErrorInfo) => {
        HistoryService.instance.replace(Routes.Error.SomethingWentWrong, { error, errorInfo });
    };

    return (
        <ErrorBoundary onError={handleError}>
            <Router history={HistoryService.instance}>
                <Suspense fallback={<div>loading...</div>}>
                    <Switch>
                        <Route exact path={Routes.Error.NotFound} component={NotFoundPage} />
                        <Route
                            exact
                            path={Routes.Error.SomethingWentWrong}
                            component={SomethingWentWrongPage}
                        />
                        <Route component={MainPage} />
                    </Switch>
                </Suspense>
            </Router>
        </ErrorBoundary>
    );
};

export default Application;
