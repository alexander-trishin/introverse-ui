import { render, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

import { Routes } from 'common/routes';

import MainPage from './MainPage';

jest.mock('pages/ComingSoonPage/ComingSoonPage', () => () => <div data-testid="home" />);

describe('<MainPage />', () => {
    it('should render suspense fallback', () => {
        const history = createMemoryHistory();

        const { getByText } = render(
            <Router history={history}>
                <MainPage />
            </Router>
        );

        expect(getByText(/loading/i)).toBeInTheDocument();
    });

    it('should render home page', async () => {
        const history = createMemoryHistory({
            initialEntries: [Routes.Page.Home]
        });

        const { getByTestId } = render(
            <Router history={history}>
                <MainPage />
            </Router>
        );

        await waitFor(() => {
            expect(getByTestId('home')).toBeInTheDocument();
        });
    });
});
