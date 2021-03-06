import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Routes } from 'common/routes';

import NotFoundPage from './NotFoundPage';

describe('<NotFoundPage />', () => {
    it('should redirect to home page', () => {
        const history = createMemoryHistory({
            initialEntries: [Routes.Error.NotFound]
        });

        const { getByRole } = render(
            <Router history={history}>
                <NotFoundPage />
            </Router>
        );

        userEvent.click(getByRole('link'));

        expect(history.location.pathname).toBe(Routes.Page.Home);
    });
});
